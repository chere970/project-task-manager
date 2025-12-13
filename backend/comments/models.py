from django.db import models
from .tasks import Task
from .users import User

# Create your models here.
class Comment(models.Model):
    task=models.ForeignKey(Task,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    text=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)