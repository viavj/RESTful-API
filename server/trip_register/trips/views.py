from .models import Trips
from .serials import TripSerializer
from rest_framework import generics

class TripList(generics.ListCreateAPIView):
    queryset = Trips.objects.all()
    serializer_class = TripSerializer

class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trips.objects.all()
    serializer_class = TripSerializer
