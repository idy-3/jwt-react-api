from rest_framework_simplejwt.serializers import \
    TokenObtainPairSerializer
from rest_framework import serializers
from authentication import models


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Add custom claims to jwt token"""
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # add custom claims
        token['fav_color'] = user.fav_color
        return token


class CustomUserSerializer(serializers.ModelSerializer):
    """Currently unused in preference of the below"""
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = models.CustomUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
