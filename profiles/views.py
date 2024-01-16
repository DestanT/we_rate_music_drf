from rest_framework import generics
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
    queryset = Profile.objects.all()


# Credit: code from Code Institute's React walkthrough project
class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile, if you're the owner.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all()