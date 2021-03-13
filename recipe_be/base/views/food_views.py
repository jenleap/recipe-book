from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Food
from base.serializer import FoodSerializer

@api_view(['GET'])
def getFoods(request):
    query = request.query_params.get('q')
    foods = Food.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(foods, 3)

    try:
        foods = paginator.page(page)
    except PageNotAnInteger:
        foods = paginator.page(1)
    except EmptyPage:
        foods = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = FoodSerializer(foods, many=True)
    return Response({
        'foods': serializer.data,
        'page': page,
        'totalPages': paginator.num_pages
    })