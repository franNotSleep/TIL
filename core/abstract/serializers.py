from rest_framework import serializers

class AbstractSerializer(serializers.ModelSerializer):
    """
    Abstract base serializer that includes commonly used fields such as
    `id`, `created`, and `updated` for model instances.
    """
    # A read-only UUID field that maps to the `public_id` attribute of the model being serialized,
    # and is formatted as a hexadecimal string.
    id = serializers.UUIDField(source="public_id", read_only=True, format="hex")
    
    # A read-only DateTimeField that represents the timestamp when the model instance was created.
    created = serializers.DateTimeField(read_only=True)
    
    # A read-only DateTimeField that represents the timestamp when the model instance was last updated.
    updated = serializers.DateTimeField(read_only=True)
