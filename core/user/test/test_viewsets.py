from rest_framework import status

from core.fixtures.user import user


class TestUserViewSet:
    endpoint = "/api/user/"

    def test_list(self, client, user):
        """
        Test that a list of all User objects can be retrieved.
        """
        client.force_authenticate(user=user)
        response = client.get(self.endpoint)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    def test_retrieve(self, client, user):
        """
        Test that a single User object can be retrieved.
        """
        client.force_authenticate(user=user)
        response = client.get(self.endpoint + str(user.public_id) + "/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == user.public_id.hex
        assert response.data["username"] == user.username
        assert response.data["posts_count"] == 0 
        assert response.data["comments_count"] == 0

    def test_create(self, client, user):
        """
        Test that a User object cannot be created.
        """
        client.force_authenticate(user=user)
        data = {}
        response = client.post(self.endpoint, data)
        assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

    def test_update(self, client, user):
        """
        Test that a User object can be updated.
        """
        client.force_authenticate(user=user)

        data = {"username": "new_username"}

        response = client.patch(self.endpoint + str(user.public_id) + "/", data)

        assert response.status_code == status.HTTP_200_OK
        assert response.data["username"] == data["username"]

    def test_allowed_action(self, client, user):
        """
        Test that unauthenticated users cannot perform any actions.
        """
        retrieve_response = client.get(self.endpoint + str(user.public_id) + "/")
        list_response = client.get(self.endpoint)

        assert list_response.status_code == status.HTTP_401_UNAUTHORIZED
        assert retrieve_response.status_code == status.HTTP_401_UNAUTHORIZED
