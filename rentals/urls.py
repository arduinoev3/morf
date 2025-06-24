from django.urls import path
from . import views

urlpatterns = [
    path('items-data/', views.items_data),
    path('items-order/', views.items_order),
]
