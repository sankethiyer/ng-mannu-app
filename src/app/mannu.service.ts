import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mannu } from './mannu-form/mannu.model';
import { MannuStorageService } from './mannu-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MannuService {
  mannusChanged = new Subject<Mannu[]>();
  private mannus: Mannu[] = [];

  constructor() { }

  getMannus() {
    return this.mannus.slice()
  }

  setMannus(mannus: Mannu[]) {
    this.mannus = mannus;
    this.mannusChanged.next(this.mannus.slice())
  }

  addMannu(mannu: Mannu) {
    this.mannus.push(mannu);
    this.mannusChanged.next(this.mannus.slice())
  }

  deleteMannu(id: string) {
    var index = this.getMannus().findIndex((mannu) => {
      return mannu.id === id;
    })
    this.mannus.splice(index, 1);
    this.mannusChanged.next(this.mannus.slice())
  }

  updateMannu(id: string, newMannu: Mannu) {
    newMannu.id = id;
    this.mannus[this.mannus.findIndex(el => el.id === id)] = newMannu;
    this.mannusChanged.next(this.mannus.slice())
  }
}
