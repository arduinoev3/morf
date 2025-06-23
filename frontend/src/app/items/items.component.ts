import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent {
  http = inject(HttpClient);

  items: any = [];
  itemsFilter = [
    { active: true, name: 'Все марки' }, // первый — активный
    { active: false, name: 'Lamborghini' },
    { active: false, name: 'Ferrari' },
    { active: false, name: 'Porsche' },
    { active: false, name: 'BMW' },
    { active: false, name: 'Mercedes' },
    { active: false, name: 'Chevrolet' },
    { active: false, name: 'Audi' },
    { active: false, name: 'Ford' },
  ];

  orderForm = new FormGroup({
    item: new FormControl(''),
    name: new FormControl(''),
    phone: new FormControl(''),
  });

  ngOnInit() {
    this.fetchItems('');
  }

  fetchItems(filter: string) {
    this.http
      .get('https://testologia.ru/cars-data', {
        params: { filter },
      })
      .subscribe((data) => (this.items = data));
  }

  changeFilter(filter: any, itemsContent: HTMLElement) {
    this.itemsFilter.forEach((f) => (f.active = false));
    filter.active = true;
    this.fetchItems(filter.name);
    itemsContent.scrollIntoView({ behavior: 'auto' });
  }

  isError(name: string) {
    const c = this.orderForm.get(name);
    return !!(c?.invalid && (c.dirty || c.touched));
  }

  sendOrder() {
    if (this.orderForm.valid) {
      this.http
        .post('https://testologia.ru/cars-order', this.orderForm.value)
        .subscribe({
          next: (r: any) => {
            alert(r.message);
            this.orderForm.reset();
          },
          error: (e) => alert(e.error.message),
        });
    }
  }
}
