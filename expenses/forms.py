from django import forms
from .models import Expense, Category
from django.forms.widgets import NumberInput
from django.contrib.auth.models import User


choices = Category.objects.all().values_list('name')

choice_list = []

for item in choices:
    choice_list.append(item)

owner_ = User.objects.all()

class ExpenseForm(forms.ModelForm):
    """Form for the image model"""
    class Meta:
        model = Expense
        fields =  (
            'amount', 'category', 'description', 'owner', 'receipt', 'date',
           )
        
        widgets = {
            'description': forms.TextInput(attrs={'class': 'form-control'}),
            'category': forms.Select(choices=choice_list, attrs={'class': 'form-control'}),
        }
        