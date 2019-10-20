import { Component, OnInit, OnDestroy } from '@angular/core';
import { MannuStorageService } from '../mannu-storage.service';
import { Subscription } from 'rxjs';
import { Mannu } from '../mannu-form/mannu.model';
import { MannuNameComponent } from '../mannu-form/mannu-name/mannu-name.component';
import { MannuService } from '../mannu.service';

@Component({
  selector: 'app-mannu-list',
  templateUrl: './mannu-list.component.html',
  styleUrls: ['./mannu-list.component.css']
})
export class MannuListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  mannus: Mannu[] = [];
  now: Date = new Date();
  nextMonth: Date = new Date();

  constructor(
    private mannuStorageService: MannuStorageService,
    private mannuService: MannuService
  ) { }

  ngOnInit() {

    this.nextMonth.setMonth(this.now.getMonth() + 1)

    this.mannuStorageService.fetchAllMannu().subscribe()
    this.mannus = this.mannuService.getMannus();

    this.subscription = this.mannuService.mannusChanged
      //this.subscription = this.mannuStorageService.fetchAllMannu()
      .subscribe((mannus: Mannu[]) => {
        this.mannus = Object.values(mannus);
        console.log(this.mannus);
        this.mannus.forEach(mannu => {          
          if (new Date(mannu.expiryDate) < this.now) {
            mannu.expiredClass = ' text-danger'
          } else if (new Date(mannu.expiryDate) < this.nextMonth) {
            mannu.expiredClass = '  text-warning'
          } else {
            mannu.expiredClass = ' text-dark'
          }
        });

      })

  }


  // fetchAllMannu() {
  //   this.mannuStorageService.fetchAllMannu().subscribe(response => {
  //     // console.log(Object.entries(response));
  //     // console.log(Object.keys(response));

  //     Object.values(response).forEach(element => {
  //       console.log(element);

  //     });
  //   });
  // }

  onEditMannu(mannu: Mannu) {
    this.mannuStorageService.updateMannu(mannu.id, mannu);
  }

  onDeleteMannu(mannu) {
    this.mannuStorageService.deleteMannu(mannu).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
