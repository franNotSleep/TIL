import pytest

from core.post.models import Post
from core.fixtures.user import user


@pytest.fixture
def post(db, user):
    data = {"author": user, "title": "Simple title", "body": "Simple body"}
    return Post.objects.create(**data)
