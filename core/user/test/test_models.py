import pytest
from core.user.models import User

data_user = {
    "username": "test_user",
    "email": "test@email.com",
    "first_name": "Test",
    "last_name": "User",
    "password": "abc123",
}

@pytest.mark.django_db
def test_create_user():
    """
    Test creating a regular user using the User.objects.create_user method.
    Asserts that the user's attributes are correctly set, and that the password
    is not stored in plaintext.
    """
    user = User.objects.create_user(**data_user)
    assert user.username == data_user["username"]
    assert user.password != data_user["password"]
    assert user.email == data_user["email"]
    assert user.first_name == data_user["first_name"]

