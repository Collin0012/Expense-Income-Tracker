from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='preferences'),
    path('profile', views.profile_view, name='profile_view')
]
