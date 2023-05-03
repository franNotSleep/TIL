from core.abstract.serializers import AbstractSerializer
from core.user.models import User

from django.conf import settings

from rest_framework import serializers

class UserSerializer(AbstractSerializer):
    posts_count = serializers.SerializerMethodField()
    reinforces_count = serializers.SerializerMethodField()

    def get_posts_count(self, instance):
        return instance.post_set.all().count()

    def get_reinforces_count(self, instance):
        return instance.reinforce_set.all().count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation['avatar']:
            representation['avatar'] = settings.DEFAULT_AVATAR_URL
        return representation

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "last_name",
            "first_name",
            "avatar",
            "reinforces_count",
            "posts_count",
            "email",
            "created",
            "updated",
        ]

        read_only_field = ["is_active"]
