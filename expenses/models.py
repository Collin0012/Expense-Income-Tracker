from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.core.files.storage import FileSystemStorage

# Create your models here.
# receipt_foda = FileSystemStorage(location='media/receipts_foda/')
# storage=receipt_foda, upload_to='receipts_foda/%Y-%m-%d', 



class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date=models.DateField(default=now)
    description = models.TextField()
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    receipt = models.ImageField(null=True, blank=True, default='default.jpg')
    category = models.CharField(max_length=255)
    
    def __str__(self):
        return self.category
    
    class Meta:
        ordering = ['-date']
        
              
        
class Category(models.Model):
    name = models.CharField(max_length=255)
    
    class Meta:
        verbose_name_plural = ('Categories')
    
    def __str__(self):
        return self.name
        
        
