import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ItemsComponent } from './app/items/items.component';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [ItemsComponent],
  template: `<app-items></app-items>`,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [provideHttpClient()],
});
