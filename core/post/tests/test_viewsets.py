from rest_framework import status

from core.fixtures.user import user
from core.fixtures.post import post


class TestPostViewSet:
    endpoint = "/api/post/"

    def test_list(self, client, user, post):
        # User Authenticated
        client.force_authenticate(user=user)
        response = client.get(self.endpoint)

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    def test_retrieve(self, client, user, post):
        client.force_authenticate(user=user)
        response = client.get(self.endpoint + f"{post.public_id}/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["title"] == post.title
        assert response.data["author"]["id"] == user.public_id.hex

    def test_create(self, client, user):
        client.force_authenticate(user=user)
        data = {
            "author": user.public_id.hex,
            "title": "Simple title",
            "body": "Simple body",
        }

        response = client.post(self.endpoint, data)

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["title"] == data["title"]
        assert response.data["body"] == data["body"]
        assert response.data["author"]["id"] == data["author"]
