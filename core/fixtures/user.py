import pytest
from core.user.models import User

data_user = {
    "username": "test_user",
    "email": "test@email.com",
    "first_name": "Test",
    "last_name": "User",
    "password": "abc123123",
}

data_user1 = {
    "username": "test_user1",
    "email": "test1@email.com",
    "first_name": "Test1",
    "last_name": "User1",
    "password": "abc123123",
}


@pytest.fixture
def user(db) -> User:
    return User.objects.create_user(**data_user)


@pytest.fixture
def user1(db) -> User:
    return User.objects.create_user(**data_user1)
