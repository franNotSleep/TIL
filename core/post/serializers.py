from django.template import context
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.user.models import User
from core.user.serializers import UserSerializer
from core.abstract.serializers import AbstractSerializer
from core.post.models import Post


class PostSerializer(AbstractSerializer):
    author = serializers.SlugRelatedField(
        slug_field="public_id", queryset=User.objects.all()
    )

    def validate_author(self, data_author):
        if self.context["request"].user != data_author:
            raise ValidationError("You can't create a post for another user.")

        return data_author

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        author_id = representation["author"]
        author = User.objects.get_object_by_public_id(author_id)

        representation["author"] = UserSerializer(author, context=self.context).data

        return representation

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "title",
            "body",
            "created",
            "updated",
        ]
