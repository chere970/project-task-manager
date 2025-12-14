from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Task
from .serializers import TaskSerializer, TaskListSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing tasks.
    Users can see tasks from projects they created or are members of.
    """
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['due_date', 'created_at', 'priority', 'status']
    ordering = ['due_date', '-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return TaskListSerializer
        return TaskSerializer
    
    def get_queryset(self):
        """
        Return tasks from projects where the user is creator or member.
        """
        user = self.request.user
        queryset = Task.objects.filter(
            Q(project__created_by=user) | Q(project__members=user)
        ).distinct()
        
        # Filter by project if provided
        project_id = self.request.query_params.get('project', None)
        if project_id is not None:
            queryset = queryset.filter(project_id=project_id)
        
        # Filter by status if provided
        status = self.request.query_params.get('status', None)
        if status is not None:
            queryset = queryset.filter(status=status)
        
        # Filter by assigned user
        assigned_to = self.request.query_params.get('assigned_to', None)
        if assigned_to == 'me':
            queryset = queryset.filter(assigned_to=user)
        elif assigned_to is not None:
            queryset = queryset.filter(assigned_to_id=assigned_to)
        
        # Filter by priority if provided
        priority = self.request.query_params.get('priority', None)
        if priority is not None:
            queryset = queryset.filter(priority=priority)
        
        return queryset
    
    def perform_create(self, serializer):
        # Automatically set the creator to the current user
        serializer.save(created_by=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_tasks(self, request):
        """
        Get all tasks assigned to the current user.
        GET /tasks/my_tasks/
        """
        tasks = self.get_queryset().filter(assigned_to=request.user)
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)