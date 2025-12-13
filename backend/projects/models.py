from django.db import models
from .users  import Users
# Create your models here.
class Project(models.Model):
    name=models.CharField(max_length=255)
    description=models.TextField()
    members=models.ManyToManyField(Users.User)
    created_by=models.ForeignKey(Users.User,on_delete=models.CASCADE)