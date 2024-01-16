from rest_framework import serializers
from .models import Profile


# Credit: code from Code Institute's React walkthrough project
class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'image', 'background'
        ]