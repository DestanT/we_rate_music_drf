from django.db.models import Count, Avg
from django_filters.rest_framework import DjangoFilterBackend
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
        following_count = Count('owner__following', distinct=True),
        average_rating = Avg('owner__rating__score')
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend
    ]
    ordering_fields = [
        'playlists_count',
        'followers_count',
        'following_count',
        'owner__followed_by__created_at',
        'owner__following__created_at'
    ]
    search_fields = [
        'owner__username'
    ]
    filterset_fields = [
        # Profiles of other users following owner
        'owner__following__followed__profile',
        # Profiles followed by owner
        'owner__followed_by__owner__profile'
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