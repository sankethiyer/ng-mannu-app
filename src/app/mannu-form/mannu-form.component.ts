import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Mannu } from './mannu.model';
import { MannuStorageService } from '../mannu-storage.service';

@Component({
  selector: 'app-mannu-form',
  templateUrl: './mannu-form.component.html',
  styleUrls: ['./mannu-form.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class MannuFormComponent implements OnInit {
  model: Date;
  @Output() countChanged: EventEmitter<number> = new EventEmitter();


  constructor(private mannuStorageService: MannuStorageService) { }

  ngOnInit() {
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
    this.mannuStorageService.storeMannu(mannu).subscribe();
    form.reset();
    this.countChanged.emit(0);

  }


}
