import pytest

from core.reinforce.models import Reinforce
from core.fixtures.post import post
from core.fixtures.user import user


@pytest.mark.django_db
def test_create(post, user):
    data = {
        "author": user,
        "post": post,
        "body": "simple reinforce",
    }
    instance = Reinforce.objects.create(**data)

    assert instance.author == data["author"]
    assert instance.post == data["post"]
    assert instance.body == data["body"]
    assert instance.source is None
