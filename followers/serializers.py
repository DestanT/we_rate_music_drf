from rest_framework import serializers
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from .models import Follower


# Credit: code from Code Institute's React walkthrough project
class FollowerSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    followed_user = serializers.ReadOnlyField(source='followed.username')

    class Meta:
        model = Follower
        fields = [
            'id', 'owner', 'followed', 'followed_user',
            'created_at',
        ]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })
        except ValidationError as e:
            raise serializers.ValidationError({
                'detail': e.message
            })
