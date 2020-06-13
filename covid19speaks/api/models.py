from django.db import models

# Create your models here.

class OneUnit(models.Model):
    title = models.CharField(max_length = 64)
    description = models.TextField(max_length = 1000, blank=True, default='')
    image = models.ImageField(upload_to='images/',blank= True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default= 0)
    date = models.DateField(auto_now_add=True)
    views = models.IntegerField(default=0)
    
    def __str__(self):
        return self.title