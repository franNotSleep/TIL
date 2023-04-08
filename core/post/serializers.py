from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.user.models import User
from core.user.serializers import UserSerializer
from core.abstract.serializers import AbstractSerializer
from core.post.models import Post


class PostSerializer(AbstractSerializer):
    """
    Serializer class for the Post model, used to convert Post instances to and from Python primitives.
    Includes custom validation for the author field, and converts the author ID to the corresponding
    user's public ID when serializing Post instances.
    """

    # Defining a SlugRelatedField for the author field that returns the user's public_id instead of user's id
    author = serializers.SlugRelatedField(
        slug_field="public_id", queryset=User.objects.all()
    )

    def validate_author(self, data_author):
        """
        Custom validation for the author field, ensuring that the requesting user is the same as the author.

        Args:
            data_author (User): The author to validate.

        Raises:
            ValidationError: If the requesting user is not the same as the author.

        Returns:
            User: The validated author.
        """
        if self.context["request"].user != data_author:
            raise ValidationError("You can't create a post for another user.")

        return data_author

    def to_representation(self, instance):
        """
        Convert the given Post instance into a dictionary of primitive Python types.
        Replaces the author id in the representation with the serialized author data.

        Args:
            instance (Post): The Post instance to convert.

        Returns:
            dict: A dictionary of primitive Python types representing the given Post instance,
                  with the author id replaced by the serialized author data.
        """
        representation = super().to_representation(instance)

        author_id = representation["author"]
        author = User.objects.get_object_by_public_id(author_id)

        representation["author"] = UserSerializer(author).data

        return representation

    class Meta:
        """
        Meta class for the PostSerializer, defining the model and fields to include in the serialized output.
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
