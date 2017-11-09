import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  onSelected(data) {
  	console.log('Listo', data);
  }
}
