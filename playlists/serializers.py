from rest_framework import serializers
from .models import Playlist
from ratings.models import Rating


class PlaylistSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    owner_id = serializers.ReadOnlyField(source='owner.id')
    is_owner = serializers.SerializerMethodField()
    rating_id = serializers.SerializerMethodField()
    ratings_count = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner
    
    def get_rating_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            rating = Rating.objects.filter(
                owner=user, playlist=obj
            ).first()
            return rating.id if rating else None
        return None
    
    class Meta:
        model = Playlist
        fields = [
            'id', 'spotify_id', 'owner', 'owner_id', 'is_owner',
            'added_on', 'title', 'image', 'description',
            'url', 'iframe_uri', 'rating_id',
            'ratings_count', 'average_rating'
        ]