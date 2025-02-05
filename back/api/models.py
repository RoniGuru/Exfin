from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.
class Expense(models.Model):
    #fields
    title = models.CharField(max_length=100)
    cost = models.DecimalField(decimal_places=2, max_digits=8)
    date = models.DateTimeField(default=timezone.now)#auto add time
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="expenses")# specifiying who made note
    #foreign keys link data to user, one user can have many notes 
    #if user deleted all notes deleted on_delete=models.CASCADE

    def __str__(self):
        return self.title