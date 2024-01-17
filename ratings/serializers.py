from rest_framework import serializers
from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    playlist_owner = serializers.ReadOnlyField(source='playlist.owner.username')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner
    
    class Meta:
        model = Rating
        fields = [
            'id', 'owner', 'playlist', 'playlist_owner',
            'is_owner', 'score', 'created_at', 'updated_at',
        ]


class RatingDetailSerializer(RatingSerializer):
    playlist = serializers.ReadOnlyField(source='playlist.id')