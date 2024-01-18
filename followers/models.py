from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


# Credit: code from Code Institute's React walkthrough project
class Follower(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['owner', 'followed']

    def __str__(self):
        return f"{self.owner} now follows {self.followed}"