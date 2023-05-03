from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from core.abstract.models import AbstractModel, AbstractManager
from django.db import models

def upload_to(instance, filename): 
    return "images/{filename}".format(filename=filename)


class UserManager(BaseUserManager, AbstractManager):
    """
    Custom manager for the User model.
    """

    def create_user(self, username, email, password=None, **kwargs):
        """
        Creates a new User object with the given username, email, and password.
        Raises a TypeError if any of those fields are None.
        """
        if username is None:
            raise TypeError("Users must have an username.")
        if email is None:
            raise TypeError("Users must have an email.")
        if password is None:
            raise TypeError("Users must have a password.")

        user = self.model(
            username=username, email=self.normalize_email(email), **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **kwargs):
        """
        Creates a new superuser object with the given username, email, and password.
        Raises a TypeError if any of those fields are None.
        """
        if password is None:
            raise TypeError("superusers must have a password.")
        if username is None:
            raise TypeError("superusers must have a username.")
        if email is None:
            raise TypeError("superusers must have a email.")

        user = self.create_user(username, email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractModel, AbstractBaseUser):
    """
    Custom user model for the application.
    """

    username = models.CharField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    avatar = models.ImageField(null=True, blank=True, upload_to=upload_to)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def __str__(self):
        """
        Returns a string representation of the User object.
        """
        return f"{self.email}"

    @property
    def name(self):
        """
        Returns the full name of the User object.
        """
        return f"{self.first_name} {self.last_name}"
