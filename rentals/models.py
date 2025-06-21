from django.db import models

class Item(models.Model):
    """
    Любая сдаваемая в аренду вещь:
    сумка, платье, дрон, авто, PS5 — не важно.
    """
    brand = models.CharField('Бренд', max_length=60)
    title = models.CharField('Название модели', max_length=120)
    description = models.TextField('Описание')
    image = models.URLField('URL картинки')
    price_day_1 = models.PositiveIntegerField('Цена за 1 сутки')
    price_days_1_3 = models.PositiveIntegerField('Цена за 1–3 суток')
    price_days_3_plus = models.PositiveIntegerField('Цена за 3+ суток')

    class Meta:
        ordering = ['brand', 'title']

    def __str__(self):
        return self.title


class RentalOrder(models.Model):
    """
    Заявка клиента: хранит имя, телефон и текстовое название вещи,
    чтобы не потерять заказ, даже если вещь будет удалена из каталога.
    """
    item = models.ForeignKey(Item, null=True, blank=True,
                             on_delete=models.SET_NULL,
                             related_name='orders')
    item_title = models.CharField('Вещь (строкой)', max_length=120)
    name = models.CharField('Имя клиента', max_length=100)
    phone = models.CharField('Телефон', max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} – {self.item_title}'
