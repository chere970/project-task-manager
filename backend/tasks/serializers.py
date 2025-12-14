from rest_framework import serializers
from .models import Task
from django.contrib.auth import get_user_model

User = get_user_model()

class TaskSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.name', read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True, allow_null=True)
    assigned_to_email = serializers.CharField(source='assigned_to.email', read_only=True, allow_null=True)
    
    class Meta:
        model = Task
        fields = [
            'id', 'project', 'project_name', 'title', 'description',
            'status', 'priority', 'assigned_to', 'assigned_to_username',
            'assigned_to_email', 'created_by', 'created_by_username',
            'due_date', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

class TaskListSerializer(serializers.ModelSerializer):
    """Simplified serializer for list views"""
    project_name = serializers.CharField(source='project.name', read_only=True)
    assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True, allow_null=True)
    
    class Meta:
        model = Task
        fields = [
            'id', 'project', 'project_name', 'title', 'status',
            'priority', 'assigned_to_username', 'due_date', 'created_at'
        ]

