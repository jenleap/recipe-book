from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from base.models import Food
from base.serializer import FoodSerializer

@api_view(['GET'])
def getFoods(request):
    query = request.query_params.get('q')
    foods = Food.objects.filter(name__icontains=query)
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data)