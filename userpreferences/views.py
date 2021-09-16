from django.shortcuts import render, redirect
import os
import json
from django.conf import settings
from .models import UserPreferences
from django.contrib import messages
from .forms import UserUpdateForm, ProfileUpdateForm

# Create your views here.

def index(request):
    
    currency_data = []
        
    file_path = os.path.join(settings.BASE_DIR, 'currencies.json')
        
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)
        for k,v in data.items():
            currency_data.append({'name': k, 'value': v})
            
    
    exists = UserPreferences.objects.filter(user=request.user).exists()
    
    user_preferences = None
    
    if exists:
        user_preferences = UserPreferences.objects.get(user=request.user)
    
    if request.method == 'GET':
        
        return render(request, 'preferences/index.html', {'currencies': currency_data, 'user_preferences': user_preferences})
    
    else:
        currency = request.POST['currency']
        
        if exists:
            user_preferences.currency = currency
            user_preferences.save()
        else:
            UserPreferences.objects.create(user=request.user, currency=currency)
        messages.success(request, 'Changes Saved')
        return render(request, 'preferences/index.html', {'currencies': currency_data, 'user_preferences': user_preferences})
        
        
def profile_view(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            context = {
                'u_form': u_form,
                'p_form': p_form,
            }
            return render(request, 'preferences/profile.html', context)
    
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)
    
    context = {
        'u_form': u_form,
        'p_form': p_form,
    }
    
    return render(request, 'preferences/profile.html', context)
