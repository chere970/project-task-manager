from django.shortcuts import render
from .models import Comment

from .serializer import CommentSerializer

# Create your views here.

def comment_list(request):
    # return render(request, 'comments/comment_list.html')
    query_set = Comment.objects.all()
    serializer_class = CommentSerializer(query_set, many=True)
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Comment
from .serializer import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing comments on tasks.
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Optionally filter by task_id query parameter
        queryset = Comment.objects.all()
        task_id = self.request.query_params.get('task_id', None)
        if task_id is not None:
            queryset = queryset.filter(task_id=task_id)
        return queryset.order_by('created_at')
    
    def perform_create(self, serializer):
        # Automatically set the user to the current authenticated user
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def by_task(self, request):
        """
        Get all comments for a specific task.
        GET /comments/by_task/?task_id=1
        """
        task_id = request.query_params.get('task_id')
        if not task_id:
            return Response(
                {'error': 'task_id parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        comments = Comment.objects.filter(task_id=task_id).order_by('created_at')
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)