from django.urls import path
from . import views

urlpatterns = [
    path('tickets/', views.TicketListCreate.as_view(), name='ticket-list-create'),
    path('tickets/<int:pk>/', views.TicketRetrieveUpdateAPIView.as_view(), name='ticket-detail'),
    path('accounts/me/', views.MeView.as_view(), name='current-user'),
]