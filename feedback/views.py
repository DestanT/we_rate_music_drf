from rest_framework import generics, permissions
from we_rate_music_drf.permissions import IsOwnerOrReadOnly
from .models import Feedback
from .serializers import FeedbackSerializer


class FeedbackList(generics.ListCreateAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Feedback.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FeedbackDetail(generics.RetrieveDestroyAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Feedback.objects.all()