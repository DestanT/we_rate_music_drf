from rest_framework import serializers
from .models import Profile


# Credit: code from Code Institute's React walkthrough project
class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Profile
        fields = [
            'id', 'user', 'created_at', 'image', 'background'
        ]