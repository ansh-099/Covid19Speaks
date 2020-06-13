from rest_framework import serializers
from .models import OneUnit


class OneUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OneUnit
        fields = ('id', 'title', 'description', 'image', 'likes', 'dislikes', 'date','views')
