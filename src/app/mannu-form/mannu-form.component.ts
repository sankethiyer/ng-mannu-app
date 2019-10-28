import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Mannu } from './mannu.model';
import { MannuStorageService } from '../mannu-storage.service';
import { MannuNameComponent } from './mannu-name/mannu-name.component';
import { MannuService } from '../mannu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mannu-form',
  templateUrl: './mannu-form.component.html',
  styleUrls: ['./mannu-form.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class MannuFormComponent implements OnInit {
  model: Date;
  editingSubscription: Subscription;
  @ViewChild('mannuEntryForm', { static: false }) mannuEntryForm: NgForm;
  editMode: boolean = false;
  editId: any;
  tabSubscription: Subscription;

  constructor(private mannuStorageService: MannuStorageService, private mannuService: MannuService) { }

  ngOnInit() {

    this.editingSubscription = this.mannuService.editingMannu.subscribe((mannu: Mannu) => {
      this.mannuEntryForm.setValue({
        mannuName: mannu.mannuName,
        tabletsRemaining: mannu.tabletsRemaining,
        expiryDate: new Date(mannu.expiryDate)
      })
      this.editMode = true;
      this.editId = mannu.id;      
    });
  }

  onFormSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const mannu = new Mannu(
      form.value.expiryDate,
      form.value.mannuName,
      form.value.tabletsRemaining
    );
    if (this.editMode) {
      this.mannuStorageService.updateMannu(this.editId, mannu).subscribe();
    } else {
      this.mannuStorageService.storeMannu(mannu).subscribe();
    }
    form.reset();
    this.mannuService.selectedIndexChanged.next(0);
  }
}
