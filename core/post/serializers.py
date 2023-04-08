from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.user.models import User
from core.user.serializers import UserSerializer
from core.abstract.serializers import AbstractSerializer
from core.post.models import Post


class PostSerializer(AbstractSerializer):
    # Defining a SlugRelatedField for the author field that returns the user's public_id instead of user's id
    author = serializers.SlugRelatedField(
        slug_field="public_id", queryset=User.objects.all()
    )

    def validate_author(self, res_author):
        """
        Custom validation method for the author field.

        Checks that the authenticated user making the request is the same as the author
        of the post being created or updated. If they are not the same, a ValidationError
        is raised with the message "You can't create a post for another user."
        """
        if self.context["request"].user != res_author:
            raise ValidationError("You can't create a post for another user.")

        return res_author

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        author_id = representation["author"]
        author = User.objects.get_object_by_public_id(author_id)

        representation["author"] = UserSerializer(author).data

        return representation

    class Meta:
        """
        Metadata class for the PostSerializer.

        Defines the model and fields used by the serializer.
        """

        model = Post
        fields = [
            "id",
            "author",
            "title",
            "body",
            "created",
            "updated",
        ]
