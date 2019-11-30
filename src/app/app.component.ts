import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MannuService } from './mannu.service';
import { Mannu } from './mannu-form/mannu.model';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {


  name = 'Mannu App';
  selectedIndex = 1;
  sub: Subscription;

  ngOnInit(): void {
    this.sub = this.mannuService.selectedIndexChanged.subscribe((selectedIndex: number) => {

      console.log(selectedIndex);
      this.selectedIndex = selectedIndex
    })
  }

  constructor(private mannuService: MannuService) { }
  // countChangedHandler(count: number) {
  //   console.log(count);
  // }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    // console.log('tabChangeEvent => ', tabChangeEvent);
    // console.log('index => ', tabChangeEvent.index);
    this.selectedIndex = tabChangeEvent.index
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
