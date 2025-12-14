from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Project
from .serializers import ProjectSerializer, ProjectListSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing projects.
    Users can only see projects they created or are members of.
    """
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['created_at', 'updated_at', 'name']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        return ProjectSerializer
    
    def get_queryset(self):
        """
        Return projects where the user is the creator or a member.
        """
        user = self.request.user
        queryset = Project.objects.filter(
            Q(created_by=user) | Q(members=user)
        ).distinct()
        
        # Filter by active status if provided
        is_active = self.request.query_params.get('is_active', None)
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        
        return queryset
    
    def perform_create(self, serializer):
        # Automatically set the creator to the current user
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['get'])
    def tasks(self, request, pk=None):
        """
        Get all tasks for a specific project.
        GET /projects/{id}/tasks/
        """
        project = self.get_object()
        tasks = project.tasks.all().order_by('due_date', '-created_at')
        
        from tasks.serializers import TaskListSerializer
        serializer = TaskListSerializer(tasks, many=True)
        return Response(serializer.data)