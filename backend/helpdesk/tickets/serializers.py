from rest_framework import serializers
from .models import Ticket
from django.contrib.auth.models import User

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id', 'name', 'email', 'description', 'status', 'response', 'created_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']