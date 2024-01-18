from rest_framework import generics, permissions
from we_rate_music_drf.permissions import IsOwnerOrReadOnly
from .models import Follower
from .serializers import FollowerSerializer


# Credit: code from Code Institute's React walkthrough project
class FollowerList(generics.ListCreateAPIView):
    serializer_class = FollowerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Follower.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FollowerDetail(generics.RetrieveDestroyAPIView):
    serializer_class = FollowerSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Follower.objects.all()
