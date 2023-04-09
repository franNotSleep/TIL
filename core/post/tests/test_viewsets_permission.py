from rest_framework import status

from core.fixtures.user import user
from core.fixtures.post import post


class TestPostPermissionViewSet:
    """Test suite for testing the permissions of CRUD operations on a Post model."""

    endpoint = "/api/post/"

    def test_list(self, client, user, post):
        """Test retrieving all posts."""
        response = client.get(self.endpoint)

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    def test_retrieve(self, client, user, post):
        """Test retrieving a specific post."""
        response = client.get(self.endpoint + f"{post.public_id}/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["title"] == post.title
        assert response.data["author"]["id"] == user.public_id.hex

    def test_create(self, client, user):
        """Test creating a new post."""
        data = {
            "author": user.public_id.hex,
            "title": "Simple title",
            "body": "Simple body",
        }

        response = client.post(self.endpoint, data)

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_update(self, client, user, post):
        """Test updating an existing post."""
        data = {}
        response = client.put(self.endpoint + f"{post.public_id}/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_delete(self, client, user, post):
        """Test deleting an existing post."""
        response = client.delete(self.endpoint + f"{post.public_id}/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
