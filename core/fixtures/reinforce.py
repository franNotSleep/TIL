import pytest

from core.reinforce.models import Reinforce
from core.fixtures.post import post
from core.fixtures.user import user


@pytest.fixture
def reinforce(db, post, user):
    data = {
        "author": user,
        "post": post,
        "body": "simple body",
        "source": "https://dev.to/thomz/uploading-images-to-django-rest-framework-from-forms-in-react-3jhj",
    }
    return Reinforce.objects.create(**data)
