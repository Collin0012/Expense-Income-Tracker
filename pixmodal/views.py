from django.shortcuts import render
from django.views.generic import TemplateView, View
from .models import Pixmodal
from django.core import serializers

from django.http import JsonResponse
# Create your views here.

class HomeView(TemplateView):
    template_name = 'pixmodal/index.html'


class PixmodalView(View):
    
    def get(self, request):
        qs = Pixmodal.objects.all()
        data = serializers.serialize('json', qs)
        
        return JsonResponse({ 'data': data }, safe=False)