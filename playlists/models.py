from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Playlist(models.Model):
    spotify_id = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    added_on = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, max_length=300)
    image = models.URLField(max_length=255)
    url = models.URLField(max_length=255)
    iframe_uri = models.CharField(max_length=255)

    class Meta:
        ordering = ['-added_on']

    def __str__(self):
        return f"{self.title}"
