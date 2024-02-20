from django.db.models import Count, Avg
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, permissions
from we_rate_music_drf.permissions import IsOwnerOrReadOnly
from .models import Playlist
from .serializers import PlaylistSerializer


class PlaylistList(generics.ListCreateAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Playlist.objects.annotate(
        ratings_count=Count('ratings', distinct=True),
        average_rating=Avg('ratings__score')
    ).order_by('-added_on')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend
    ]
    ordering_fields = [
        'ratings_count',
        'average_rating',
        'ratings__created_at'
    ]
    search_fields = [
        'owner__username',
        'title'
    ]
    filterset_fields = [
        # User feed - playlists of followed users
        'owner__followed_by__owner__profile',
        # User's rated playlists
        'ratings__owner__profile',
        # User's playlists
        'owner__profile'
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PlaylistDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Playlist.objects.annotate(
        ratings_count=Count('ratings', distinct=True),
        average_rating=Avg('ratings__score')
    )
