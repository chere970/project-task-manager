from rest_framework import serializers
from .models import Project
from django.contrib.auth import get_user_model

User = get_user_model()

class ProjectSerializer(serializers.ModelSerializer):
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    created_by_email = serializers.CharField(source='created_by.email', read_only=True)
    members_count = serializers.SerializerMethodField()
    tasks_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'created_by', 'created_by_username', 
            'created_by_email', 'members', 'members_count', 'tasks_count',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def get_members_count(self, obj):
        return obj.members.count()
    
    def get_tasks_count(self, obj):
        return obj.tasks.count()

class ProjectListSerializer(serializers.ModelSerializer):
    """Simplified serializer for list views"""
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    members_count = serializers.SerializerMethodField()
    tasks_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'created_by_username',
            'members_count', 'tasks_count', 'is_active', 
            'created_at', 'updated_at'
        ]
    
    def get_members_count(self, obj):
        return obj.members.count()
    
    def get_tasks_count(self, obj):
        return obj.tasks.count()