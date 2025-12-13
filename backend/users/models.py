from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    Adds role-based access control.
    """

    ROLE_ADMIN = 'ADMIN'
    ROLE_MANAGER = 'MANAGER'
    ROLE_DEVELOPER = 'DEVELOPER'

    ROLE_CHOICES = (
        (ROLE_ADMIN, 'Admin'),
        (ROLE_MANAGER, 'Project Manager'),
        (ROLE_DEVELOPER, 'Developer'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=ROLE_DEVELOPER
    )

    def __str__(self):
        return f"{self.username} ({self.role})"
