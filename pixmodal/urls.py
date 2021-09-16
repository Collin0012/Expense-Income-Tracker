from django.urls import path
from .views import HomeView, PixmodalView

app_name = 'pixmadal'

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('data-json/', PixmodalView.as_view(), name='data-json'),
]