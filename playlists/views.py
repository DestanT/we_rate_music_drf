from rest_framework import generics, permissions
from we_rate_music_drf.permissions import IsOwnerOrReadOnly
from .models import Playlist
from .serializers import PlaylistSerializer


class PlaylistList(generics.ListCreateAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Playlist.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PlaylistDetail(generics.RetrieveDestroyAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Playlist.objects.all()