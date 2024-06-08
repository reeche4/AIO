from django.db import models

# models.py
class Timers(models.Model):
    HIGH = 'High'
    MEDIUM = 'Medium'
    LOW = 'Low'

    PRIORITY_CHOICES = [
        (HIGH, 'High'),
        (MEDIUM, 'Medium'),
        (LOW, 'Low'),
    ]
    title = models.CharField(max_length=100)
    minutes = models.IntegerField(default=25)
    seconds = models.IntegerField(default=0)
    category = models.CharField(max_length=50) # Add this line
    uuid = models.IntegerField(default=0)
    priority = models.IntegerField(default=0)

	


