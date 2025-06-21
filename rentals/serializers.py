from rest_framework import serializers
from .models import Item, RentalOrder

class ItemSerializer(serializers.ModelSerializer):
    text = serializers.CharField(source='description')
    prices = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ('image', 'title', 'text', 'prices')

    def get_prices(self, obj):
        return [obj.price_day_1, obj.price_days_1_3, obj.price_days_3_plus]


class RentalOrderSerializer(serializers.Serializer):
    item   = serializers.CharField(max_length=120)
    name   = serializers.CharField(max_length=100)
    phone  = serializers.CharField(min_length=10, max_length=20)

    def create(self, validated):
        item_obj = Item.objects.filter(title__iexact=validated['item']).first()
        return RentalOrder.objects.create(
            item=item_obj,
            item_title=validated['item'],
            name=validated['name'],
            phone=validated['phone']
        )
