from rest_framework import serializers
from django.db import IntegrityError
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

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })


class RatingDetailSerializer(RatingSerializer):
    playlist = serializers.ReadOnlyField(source='playlist.id')