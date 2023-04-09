from core.fixtures.user import user
from core.fixtures.post import post
from core.fixtures.reinforce import reinforce

from PIL import Image

import io

import tempfile

from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile


class TestReinforceViewSet:
    """
    Tests for the ReinforceViewSet API view.
    """

    endpoint = "/api/post/"

    def test_list(self, client, user, post, reinforce):
        """
        Test that the list endpoint returns a list of reinforce for a given post.
        """
        client.force_authenticate(user=user)
        response = client.get(self.endpoint + str(post.public_id) + "/reinforce/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    def test_retrieve(self, client, user, post, reinforce):
        """
        Test that the retrieve endpoint returns a specific reinforce for a given post and reinforce ID.
        """
        client.force_authenticate(user=user)
        response = client.get(
            self.endpoint + str(post.public_id) + f"/reinforce/{reinforce.public_id}/"
        )

        assert response.status_code == status.HTTP_200_OK
        assert response.data["body"] == "simple body"
        assert response.data["author"]["id"] == user.public_id.hex
        assert response.data["post"].hex == post.public_id.hex

    def test_create(self, client, user, post):
        """
        Test that the create endpoint successfully creates a new reinforce associated with a given post.
        """
        client.force_authenticate(user=user)

        # Create a test image
        image = Image.new("RGB", (100, 100))

        # Save the image to a temporary file
        tmp_file = tempfile.NamedTemporaryFile(suffix=".jpg")
        image.save(tmp_file)
        tmp_file.seek(0)

        # Create the data to send in the POST request
        data = {
            "author": user.public_id,
            "post": post.public_id,
            "body": "simple body",
            "photo": tmp_file,
            "source": "https://www.geeksforgeeks.org/urlfield-django-models/",
        }

        # Send a POST request to create the Reinforce object
        response = client.post(
            self.endpoint + str(post.public_id) + "/reinforce/",
            data,
            format="multipart",
        )

        # Check that the response has the expected data
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["body"] == "simple body"
        assert response.data["author"]["id"] == user.public_id.hex
        assert response.data["post"].hex == post.public_id.hex

    def test_update(self, client, user, post, reinforce):
        """
        Test that the update endpoint successfully updates an existing reinforce associated with a given post.
        """
        client.force_authenticate(user=user)

        # Create the data to send in the PUT request
        data = {
            "author": user.public_id,
            "body": "updated body",
            "post": post.public_id,
        }

        # Send a PUT request to update the Reinforce object
        response = client.put(
            self.endpoint + str(post.public_id) + f"/reinforce/{reinforce.public_id}/",
            data,
        )

        # Check that the response has the expected data
        assert response.status_code == status.HTTP_200_OK
        assert response.data["body"] == data["body"]

    def test_delete(self, client, user, post, reinforce):
        """
        Test that the delete endpoint successfully deletes an existing reinforce associated with a given post.
        """
        client.force_authenticate(user=user)

        response = client.delete(
            self.endpoint + str(post.public_id) + f"/reinforce/{reinforce.public_id}/"
        )

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_create_anonymous(self, client, post):
        """
        Test that creating a reinforce without authentication results in a 401 Unauthorized error.
        """
        data = {}

        response = client.post(
            self.endpoint + str(post.public_id) + "/reinforce/", data
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_update_anonymous(self, client, post, reinforce):
        """
        Test that updating a reinforce without authentication results in a 401 Unauthorized error.
        """
        data = {}

        response = client.put(
            self.endpoint
            + str(post.public_id)
            + "/reinforce/"
            + str(reinforce.public_id)
            + "/",
            data,
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_delete_anonymous(self, client, post, reinforce):
        """
        Test that deleting a reinforce without authentication results in a 401 Unauthorized error.
        """
        response = client.delete(
            self.endpoint
            + str(post.public_id)
            + "/reinforce/"
            + str(reinforce.public_id)
            + "/"
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
