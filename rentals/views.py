from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Item
from .serializers import ItemSerializer, RentalOrderSerializer


@api_view(['GET'])
def items_data(request):
    """
    /items-data?filter=GUCCI
    """
    flt = request.query_params.get('filter', '').strip().lower()
    qs = Item.objects.all()
    if flt and flt not in ('', 'все'):
        qs = qs.filter(brand__iexact=flt)
    return Response(ItemSerializer(qs, many=True).data)


@api_view(['POST'])
def items_order(request):
    """
    Получает JSON: {"item":"...", "name":"...", "phone":"..."}
    """
    ser = RentalOrderSerializer(data=request.data)
    ser.is_valid(raise_exception=True)
    ser.save()
    return Response(
        {"message": "Спасибо! Мы свяжемся с вами в ближайшее время."},
        status=status.HTTP_201_CREATED
    )


from django.views.generic import TemplateView

class FrontendAppView(TemplateView):
    # index.html лежит в STATIC_ROOT после билда
    template_name = "index.html"

    # SPA-fallback: всё, что не начинается с /admin/ или /api/, отдаём index.html
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
