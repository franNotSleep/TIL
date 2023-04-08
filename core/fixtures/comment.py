import pytest

from core.comment.models import Comment
from core.fixtures.post import post
from core.fixtures.user import user


@pytest.fixture
def comment(db, post, user):
    return Comment.objects.create(author=user, post=post, body="simple body")
