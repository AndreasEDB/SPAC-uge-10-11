from rest_framework import serializers

from connection.models import Category, Connection, Protocol

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProtocolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Protocol
        fields = '__all__'


class ConnectionSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    protocol = serializers.SlugRelatedField(
        queryset=Protocol.objects.all(),
        slug_field='name'  # Assuming 'name' is the field used to identify the protocol
    )

    category = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        slug_field='id',  # Assuming 'name' is the field used to identify the category
        many=True
    )

    # owner = serializers.ReadOnlyField()

    class Meta:
        model = Connection
        fields = ['id', 'name', 'host', 'port', 'username', 'password', 'protocol', 'category']


class TestConnectionSerializer(serializers.ModelSerializer):
    
    protocol = serializers.SlugRelatedField(
        queryset=Protocol.objects.all(),
        slug_field='name'  # Assuming 'name' is the field used to identify the protocol
    )
    
    class Meta:
        model = Connection
        fields = ['host', 'username', 'password', 'protocol']
        