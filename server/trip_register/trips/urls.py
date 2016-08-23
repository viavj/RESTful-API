from django.conf.urls import url
from .views import TripList, TripDetail

urlpatterns = [
    url(r'^trips/$', TripList.as_view()),
    url(r'^trips/(?P<pk>[0-9]+)/$', TripDetail.as_view())
]
