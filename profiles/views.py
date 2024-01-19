from django.db.models import Count
from rest_framework import generics, filters
from we_rate_music_drf.permissions import IsOwnerOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer


# Credit: code from Code Institute's React walkthrough project
class ProfileList(generics.ListAPIView):
    """
    List all profiles.
    No create view, as profile creation is handled by Django signals.
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.annotate(
        playlists_count = Count('owner__playlist', distinct=True),
        followers_count = Count('owner__followed_by', distinct=True),
        following_count = Count('owner__following', distinct=True)
    ).order_by('-created_at')
    filter_backends = [filters.OrderingFilter]
    ordering_fields = [
        'playlists_count',
        'followers_count',
        'following_count',
        'owner__followed_by__created_at',
        'owner__following__created_at'
    ]


# Credit: code from Code Institute's React walkthrough project
class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile, if you're the owner.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.annotate(
        playlists_count = Count('owner__playlist', distinct=True),
        followers_count = Count('owner__followed_by', distinct=True),
        following_count = Count('owner__following', distinct=True)
    )