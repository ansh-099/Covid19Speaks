from django.shortcuts import render
from .models import OneUnit
from rest_framework import viewsets, status
from .serializer import OneUnitSerializer
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.views.decorators.csrf import csrf_exempt
import json
class OneUnitViewSet(viewsets.ModelViewSet):
    parser_classes= (MultiPartParser, FormParser)
    queryset = OneUnit.objects.all()
    serializer_class = OneUnitSerializer



@api_view(('GET',))
def get_sorted_likes(request):
    allVal = OneUnit.objects.order_by('likes').reverse()
    print(allVal)
    serializer = OneUnitSerializer(allVal, many= True)
    # response = {'message': 'Sent', 'result': serializer.data}
    return Response(serializer.data)

@api_view(('GET',))
def get_sorted_views(request):
    allVal = OneUnit.objects.order_by('views').reverse()
    print(allVal)
    serializer = OneUnitSerializer(allVal, many= True)
    # response = {'message': 'Sent', 'result': serializer.data}
    return Response(serializer.data)

@api_view(('POST',))
def get_ranged_units(request):

    data = json.loads(request.body.decode('utf-8'))

    start  = int(data['start'])
    end = int(data['end'])
    val = OneUnit.objects.order_by('id')
    response = OneUnitSerializer(val, many= True).data
    for i in range(start,end):
        if(end < len(response)):
            unit = OneUnit.objects.get(id = response[i]['id'])
            unit.views += 1
            unit.save()
    
    return Response(response[start:end])

@api_view(('POST',))
def like_it(request):
    data = json.loads(request.body.decode('utf-8'))
    val = OneUnit.objects.get(id= data['id'])
    val.likes += 1
    val.save()
    return HttpResponse("DONE")

@api_view(('POST',))
def remove_like_it(request):
    data = json.loads(request.body.decode('utf-8'))
    val = OneUnit.objects.get(id= data['id'])
    val.likes -= 1
    val.save()
    return HttpResponse("DONE")
    

    

@api_view(('POST',))
def dislike_it(request):
    data = json.loads(request.body.decode('utf-8'))
    val = OneUnit.objects.get(id= data['id'])
    val.dislikes += 1
    val.save()
    return HttpResponse("DONE")
    

@api_view(('POST',))
def remove_dislike_it(request):
    data = json.loads(request.body.decode('utf-8'))
    val = OneUnit.objects.get(id= data['id'])
    val.dislikes -= 1
    val.save()
    return HttpResponse("DONE")
    

@api_view(('POST',))
def get_ranged_units_likes(request):

    data = json.loads(request.body.decode('utf-8'))

    start  = int(data['start'])
    end = int(data['end'])
    val = OneUnit.objects.order_by('likes').reverse()
    response = OneUnitSerializer(val, many= True).data
    for i in range(start,end):
        if(end < len(response)):
            unit = OneUnit.objects.get(id = response[i]['id'])
            unit.views += 1
            unit.save()
    
    return Response(response[start:end])

@api_view(('POST',))
def get_ranged_units_views(request):

    data = json.loads(request.body.decode('utf-8'))

    start  = int(data['start'])
    end = int(data['end'])
    val = OneUnit.objects.order_by('views').reverse()
    response = OneUnitSerializer(val, many= True).data
    for i in range(start,end):
        if(end < len(response)):
            unit = OneUnit.objects.get(id = response[i]['id'])
            unit.views += 1
            unit.save()
    
    return Response(response[start:end])