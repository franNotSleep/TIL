from rest_framework import status

from core.fixtures.user import user
from core.fixtures.post import post
from core.fixtures.comment import comment


class TestCommentViewSet:
    endpoint = "/api/post/"

    def test_list(self, client, user, post, comment):
        """
        Test that the list endpoint returns a list of comments for a given post.
        """
        client.force_authenticate(user=user)
        response = client.get(self.endpoint + str(post.public_id) + "/comment/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    def test_retrieve(self, client, user, post, comment):
        """
        Test that the retrieve endpoint returns a specific comment for a given post and comment ID.
        """
        client.force_authenticate(user=user)
        response = client.get(
            self.endpoint + str(post.public_id) + f"/comment/{comment.public_id}/"
        )

        assert response.status_code == status.HTTP_200_OK
        assert response.data["body"] == "simple body"
        assert response.data["author"]["id"] == user.public_id.hex
        assert response.data["post"].hex == post.public_id.hex

    def test_create(self, client, user, post):
        """
        Test that the create endpoint successfully creates a new comment associated with a given post.
        """
        client.force_authenticate(user=user)
        data = {"author": user.public_id, "post": post.public_id, "body": "simple body"}
        response = client.post(self.endpoint + str(post.public_id) + "/comment/", data)

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["body"] == "simple body"
        assert response.data["author"]["id"] == user.public_id.hex
        assert response.data["post"].hex == post.public_id.hex

    def test_update(self, client, user, post, comment):
        """
        Test that the update endpoint successfully updates an existing comment associated with a given post.
        """
        client.force_authenticate(user=user)

        data = {
            "author": user.public_id,
            "body": "updated body",
            "post": post.public_id,
        }

        response = client.put(
            self.endpoint + str(post.public_id) + f"/comment/{comment.public_id}/", data
        )

        assert response.status_code == status.HTTP_200_OK
        assert response.data["body"] == data["body"]

    def test_delete(self, client, user, post, comment):
        """
        Test that the delete endpoint successfully deletes an existing comment associated with a given post.
        """
        client.force_authenticate(user=user)

        response = client.delete(
            self.endpoint + str(post.public_id) + f"/comment/{comment.public_id}/"
        )

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_create_anonymous(self, client, post):
        """
        Test that creating a comment without authentication results in a 401 Unauthorized error.
        """
        data = {}

        response = client.post(self.endpoint + str(post.public_id) + "/comment/", data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_update_anonymous(self, client, post, comment):
        """
        Test that updating a comment without authentication results in a 401 Unauthorized error.
        """
        data = {}

        response = client.put(
            self.endpoint
            + str(post.public_id)
            + "/comment/"
            + str(comment.public_id)
            + "/",
            data,
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_delete_anonymous(self, client, post, comment):
        """
        Test that deleting a comment without authentication results in a 401 Unauthorized error.
        """
        response = client.delete(
            self.endpoint
            + str(post.public_id)
            + "/comment/"
            + str(comment.public_id)
            + "/"
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
