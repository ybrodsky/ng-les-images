import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  images: any = [];

  onSelected(data) {
  	this.images = data;
  	console.log('Listo', data);
  }
}
