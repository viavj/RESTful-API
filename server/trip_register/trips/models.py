from __future__ import unicode_literals

from django.db import models

class Trips(models.Model):
    trip = models.CharField(max_length=100)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name + ' ' + self.trip