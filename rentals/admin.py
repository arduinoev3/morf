from django.contrib import admin
from .models import Item, RentalOrder

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('brand', 'title', 'price_day_1')
    search_fields = ('brand', 'title')

@admin.register(RentalOrder)
class RentalOrderAdmin(admin.ModelAdmin):
    list_display = ('item_title', 'name', 'phone', 'created_at')
    search_fields = ('item_title', 'name', 'phone')
    list_filter = ('created_at',)
