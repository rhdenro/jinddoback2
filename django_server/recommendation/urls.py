from django.conf.urls import url
from . import views
from django.urls import path, include

urlpatterns = [
    path('execute/', views.recommend),
]