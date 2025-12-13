from django.db import models
from .projects import Project
from .users import User

# Create your models here.
class Task(models.Model):
    project=models.ForeignKey(Project,on_delete=models.CASCADE)
    title=models.CharField(max_length=255)
    description=models.TextField()
    status=models.CharField(max_length=20)
    priority=models.CharField(max_length=20)
    assigned_to=models.ForeignKey(User,on_delete=models.CASCADE,)