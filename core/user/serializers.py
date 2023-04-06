from rest_framework import serializers

from core.abstract.serializers import AbstractSerializer
from core.user.models import User


class UserSerializer(AbstractSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "last_name",
            "first_name",
            "bio",
            "email",
            "created",
            "updated",
        ]

        read_only_field = ["is_active"]
