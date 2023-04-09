import pytest

from core.reinforce.models import Reinforce
from core.fixtures.post import post
from core.fixtures.user import user

from django.core.files.uploadedfile import SimpleUploadedFile




@pytest.fixture
def reinforce(db, post, user):
    image_data = b"some image data"
    image = SimpleUploadedFile("test_image.jpg", image_data, content_type="image/jpeg")
    data = {
        "author": user,
        "post": post,
        "body": "simple body",
        "source": "https://dev.to/thomz/uploading-images-to-django-rest-framework-from-forms-in-react-3jhj",
        "photo": image
    }
    return Reinforce.objects.create(**data)
