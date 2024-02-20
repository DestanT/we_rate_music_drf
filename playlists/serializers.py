from rest_framework import serializers
from .models import Playlist
from ratings.models import Rating


class PlaylistSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    owner_id = serializers.ReadOnlyField(source='owner.id')
    ratings_count = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    is_owner = serializers.SerializerMethodField()
    rating_id = serializers.SerializerMethodField()
    owner_rating = serializers.SerializerMethodField()

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

    def get_owner_rating(self, obj):
        rating = Rating.objects.filter(
            owner=obj.owner, playlist=obj
        ).first()
        return rating.score if rating else None

    class Meta:
        model = Playlist
        fields = [
            'id', 'spotify_id', 'owner', 'owner_id', 'is_owner',
            'added_on', 'title', 'image', 'description',
            'url', 'iframe_uri', 'rating_id',
            'ratings_count', 'average_rating', 'owner_rating',
        ]
