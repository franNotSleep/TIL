from rest_framework import serializers

from core.user.serializers import UserSerializer
from core.user.models import User


class RegisterSerializer(UserSerializer):
    password = serializers.CharField(
        max_length=128, min_length=8, write_only=True, required=True
    )

    class Meta:
        model = User
        # List of all the fields that can be included in a request or a response
        fields = [
            "id",
            "bio",
            "email",
            "username",
            "first_name",
            "last_name",
            "password",
        ]

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)
