from django.db.models import Count, Avg
from rest_framework import generics, filters, permissions
from we_rate_music_drf.permissions import IsOwnerOrReadOnly
from .models import Playlist
from .serializers import PlaylistSerializer


class PlaylistList(generics.ListCreateAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Playlist.objects.annotate(
        ratings_count = Count('ratings', distinct=True),
        average_rating = Avg('ratings__score')
    ).order_by('-added_on')
    filter_backends = [filters.OrderingFilter]
    ordering_fields = [
        'ratings_count',
        'average_rating',
        'ratings__created_at'
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PlaylistDetail(generics.RetrieveDestroyAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Playlist.objects.annotate(
        ratings_count = Count('ratings', distinct=True),
        average_rating = Avg('ratings__score')
    )