import pytest

from core.comment.models import Comment

from core.fixtures.post import post
from core.fixtures.user import user


@pytest.mark.django_db
def test_create(post, user):
    data = {"author": user, "post": post, "body": "simple comment"}
    comment = Comment.objects.create(**data)

    assert comment.author == data["author"]
    assert comment.post == data["post"]
    assert comment.body == data["body"]
