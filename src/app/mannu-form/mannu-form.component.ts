import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Mannu } from './mannu.model';
import { MannuStorageService } from '../mannu-storage.service';
import { MannuService } from '../mannu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mannu-form',
  templateUrl: './mannu-form.component.html',
  styleUrls: ['./mannu-form.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class MannuFormComponent implements OnInit, OnDestroy {

  model: Date;
  editingSubscription: Subscription;
  @ViewChild('mannuEntryForm', { static: false }) mannuEntryForm: NgForm;
  editMode: boolean = false;
  editId: any = null;
  profiles: String[] = ['Pramukh', 'Ashwini', 'Ratnasindhu'];
  sub: Subscription;

  constructor(private mannuStorageService: MannuStorageService, private mannuService: MannuService) { }

  ngOnInit() {
    console.log("editMode=", this.editMode);

    this.editingSubscription = this.mannuService.editingMannu.subscribe((mannu: Mannu) => {
      if (mannu == null) {
        this.editMode = false;
        this.editId = 0;
        return;
      }
      this.mannuEntryForm.setValue({
        mannuName: mannu.mannuName,
        tabletsRemaining: mannu.tabletsRemaining,
        expiryDate: new Date(mannu.expiryDate),
        profile: mannu.profile
      })
      this.editMode = true;
      this.editId = mannu.id;
    });


    this.sub = this.mannuService.selectedIndexChanged.subscribe((selectedIndex: number) => {
      console.log("selectedIndex=>", selectedIndex);
    })
  }

  onFormSubmit(form: NgForm) {
    console.log(form);

    if (!form.valid) {
      return;
    }

    const mannu = new Mannu(
      form.value.expiryDate,
      form.value.mannuName,
      form.value.tabletsRemaining,
      form.value.profile
    );
    if (this.editMode) {
      this.mannuStorageService.updateMannu(this.editId, mannu).subscribe();
    } else {
      this.mannuStorageService.storeMannu(mannu).subscribe();
    }
    form.reset();
    this.mannuService.selectedIndexChanged.next(0);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.editingSubscription.unsubscribe()
  }
}
