import pytest

from core.reinforce.models import Reinforce
from core.fixtures.post import post
from core.fixtures.user import user

from django.core.files.uploadedfile import SimpleUploadedFile


@pytest.mark.django_db
def test_create(post, user):
    image_data = b"fake image data"
    image_file = SimpleUploadedFile(
        "test_image.jpg", image_data, content_type="image/jpeg"
    )
    data = {
        "author": user,
        "post": post,
        "body": "simple body",
        "source": "https://dev.to/thomz/uploading-images-to-django-rest-framework-from-forms-in-react-3jhj",
        "photo": image_file,
    }

    instance = Reinforce.objects.create(**data)

    assert instance.author == data["author"]
    assert instance.post == data["post"]
    assert instance.body == data["body"]
    assert instance.source == data["source"]
    assert instance.photo
