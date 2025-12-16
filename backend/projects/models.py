from django.conf import settings
from django.db import models


User = settings.AUTH_USER_MODEL


class Project(models.Model):
    """
    Represents a project that contains tasks/issues.
    """

    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_projects'
    )

    members = models.ManyToManyField(
        User,
        related_name='projects'
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


mek, shiro      pas    tasty, past besugo