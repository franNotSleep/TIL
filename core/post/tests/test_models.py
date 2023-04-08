import pytest

from core.fixtures.user import user, user1
from core.post.models import Post
from rest_framework import status


@pytest.mark.django_db
def test_create_post(user):
    data = {"author": user, "title": "Simple title", "body": "Simple body"}
    post = Post.objects.create(**data)

    assert post.body == data["body"]
    assert post.title == data["title"]
    assert post.author == data["author"]
