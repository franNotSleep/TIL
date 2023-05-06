from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.abstract.serializers import AbstractSerializer
from core.user.models import User
from core.user.serializers import UserSerializer
from core.post.models import Post
from core.comment.models import Comment


class CommentSerializer(AbstractSerializer):
    author = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="public_id"
    )
    post = serializers.SlugRelatedField(
        queryset=Post.objects.all(), slug_field="public_id"
    )

    def validate_author(self, data_author):
        if self.context["request"].user != data_author:
            raise ValidationError("You can't create a comment for another user.")
        return data_author

    def validate_post(self, data_post):
        if self.instance:
            return self.instance.post
        return data_post

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        author = User.objects.get_object_by_public_id(representation["author"])

        representation["author"] = UserSerializer(
                author, context=self.context).data
        return representation

    class Meta:
        model = Comment
        fields = ["id", "post", "author", "body", "updated", "created"]
