import pytest
from core.user.models import User

# Define the user data to use in the tests
data_user = {
    "username": "test_user",
    "email": "test@email.com",
    "first_name": "Test",
    "last_name": "User",
    "password": "abc123",
}

# Define the superuser data to use in the tests
data_superuser = {
    "username": "test_superuser",
    "email": "supertest@email.com",
    "first_name": "superTest",
    "last_name": "superUser",
    "password": "abc123",
}


# Test creating a regular user
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


# Test creating a superuser
@pytest.mark.django_db
def test_create_superuser():
    """
    Test creating a superuser using the User.objects.create_superuser method.
    Asserts that the user's attributes are correctly set, and that the password
    is not stored in plaintext. Also asserts that the user has the is_superuser
    attribute set to True.
    """
    user = User.objects.create_superuser(**data_superuser)
    assert user.username == data_superuser["username"]
    assert user.email == data_superuser["email"]
    assert user.first_name == data_superuser["first_name"]
    assert user.is_superuser == True
    assert user.password != data_superuser["password"]
