from django.db import models

# Create your models here.
class Ticket(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField()
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    response = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name