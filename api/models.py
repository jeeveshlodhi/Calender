from django.db import models

# Create your models here.
class Calender(models.Model):
    userId = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    name = models.CharField(max_length=100)