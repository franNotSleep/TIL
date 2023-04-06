from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from core.auth.serializers import LoginSerializer

class LoginViewSet(ViewSet):
    """
    Viewset class for user login functionality.
    Allows users to login and obtain JWT using their credentials.
    """
    serializer_class = LoginSerializer
    http_method_names = ["post"]
    permission_classes = (AllowAny, )
    
    def create(self, request, *args, **kwargs):
        """
        Method to handle POST request for user login.
        Validates user's credentials and generates JWT using LoginSerializer.

        Args:
            request (HttpRequest): The HTTP request object.

        Returns:
            Response: A response object containing user's information and tokens.
        """
        # Create instance of LoginSerializer using request data.
        serializer = self.serializer_class(data=request.data)
        
        try:
            # Call is_valid() method to validate user's credentials and generate tokens.
            serializer.is_valid(raise_exception=True)
        except TokenError:
            # Catch any TokenError and raise InvalidToken exception with the error message.
            raise InvalidToken(TokenError.args[0])
        
        # Return a Response object with the validated data and HTTP 200 status code.
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
