import pytest

from core.reinforce.models import Reinforce
from core.fixtures.post import post
from core.fixtures.user import user

from django.core.files.uploadedfile import SimpleUploadedFile


@pytest.mark.django_db
def test_create(post, user):
    data = {
        "author": user,
        "post": post,
        "body": "simple body",
        "source": "https://dev.to/thomz/uploading-images-to-django-rest-framework-from-forms-in-react-3jhj",
    }

    instance = Reinforce.objects.create(**data)

    assert instance.author == data["author"]
    assert instance.post == data["post"]
    assert instance.body == data["body"]
    assert instance.source == data["source"]
