from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login

from core.user.serializers import UserSerializer


class LoginSerializer(TokenObtainPairSerializer):
    """
    Serializer class for obtaining JSON Web Tokens using user's login credentials.
    Extends TokenObtainPairSerializer, which is provided by the third-party package
    Django Rest Framework Simple JWT.
    """

    def validate(self, attrs):
        """
        Method to validate user's login credentials and generate access and refresh tokens.

        Args:
            attrs (dict): A dictionary containing user's login credentials.

        Returns:
            dict: A dictionary containing user's information, access and refresh tokens.
        """
        # Call parent class method to validate user's login credentials and generate tokens.
        data = super().validate(attrs)

        # Generate refresh token using user's information.
        refresh = self.get_token(self.user)

        # Add user's information, access and refresh tokens to the data dictionary.
        data["user"] = UserSerializer(self.user).data
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        # If enabled, update user's last login time.
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        # Return the data dictionary containing user's information and tokens.
        return data
