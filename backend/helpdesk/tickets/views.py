from django.shortcuts import render
from rest_framework import generics
from .models import Ticket
from .serializers import TicketSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

class TicketListCreate(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

class TicketRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]