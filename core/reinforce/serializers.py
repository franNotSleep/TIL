from rest_framework import serializers
from rest_framework.exceptions import ValidationError


from core.comment.serializers import CommentSerializer
from core.reinforce.models import Reinforce
from core.user.models import User


class ReinfoceSerializer(CommentSerializer):
    photo = serializers.ImageField(required=False)
    author = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="public_id"
    )

    def validate_author(self, data_author):
        if self.context["request"].user != data_author:
            raise ValidationError("You can't create a reinforce for another user.")
        return data_author
    
    class Meta:
        model = Reinforce
        fields = [
            "id",
            "post",
            "author",
            "body",
            "photo",
            "source",
            "updated",
            "created",
        ]
