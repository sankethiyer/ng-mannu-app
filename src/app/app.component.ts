import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Mannu App';
  selectedIndex = 1;


  countChangedHandler(count: number) {
    console.log(count);
    this.selectedIndex = count;
  }

}
