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
    { active: true, name: 'Все' },
    { active: false, name: 'GUCCI' },
    { active: false, name: 'PRADA' },
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
      .get('https://<HEROKU_APP>.herokuapp.com/items-data', {
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
        .post('https://<HEROKU_APP>.herokuapp.com/items-order', this.orderForm.value)
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
