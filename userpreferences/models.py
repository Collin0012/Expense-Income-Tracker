from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserPreferences(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    currency = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        user_ = models.OneToOneField(to=User, on_delete=models.CASCADE)
        return str(user_)+'s'+ 'preferences'
    

# for profile details
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')
    
    def __str__(self):
        return f'{self.user.username} Profile'
    
    
    