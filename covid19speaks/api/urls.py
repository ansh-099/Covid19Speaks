from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import OneUnitViewSet, get_sorted_likes, get_sorted_views, get_ranged_units, like_it, dislike_it, remove_like_it,remove_dislike_it, get_ranged_units_views, get_ranged_units_likes

router = routers.DefaultRouter()
router.register('oneunit',OneUnitViewSet)
 

urlpatterns = [
    path('all/' ,include(router.urls)),
    path('all/likes/',get_sorted_likes),
    path('all/views/',get_sorted_views),
    path('all/getrangedunits/',get_ranged_units),
    path('all/getrangedunitslikes/',get_ranged_units_likes),
    path('all/getrangedunitsviews/',get_ranged_units_views),
    path('all/like_it/', like_it),
    path('all/dislike_it/',dislike_it ),
    path('all/remove_like_it/',remove_like_it ),
    path('all/remove_dislike_it/',remove_dislike_it ),

]
