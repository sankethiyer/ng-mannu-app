import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mannu } from './mannu-form/mannu.model';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MannuService } from './mannu.service';

const FIREBASE_DB_URL = "https://ng-mannu-app.firebaseio.com/mannus";
const FIREBASE_DB_URL_SUFFIX = ".json";
@Injectable({
  providedIn: 'root'
})
export class MannuStorageService {
  constructor(
    private http: HttpClient,
    private mannuService: MannuService
  ) { }

  storeMannu(mannu: Mannu) {
    console.log("in mannustorage.storeMannu()");

    return this.http.post(
      FIREBASE_DB_URL + FIREBASE_DB_URL_SUFFIX,
      { ...mannu }
    ).pipe(
      tap((mannuResponse) => {
        const newMannuObject = {
          ...mannu,
          id: mannuResponse.toString()
        }
        this.mannuService.addMannu(newMannuObject);
      })
    )
  }

  fetchAllMannu() {
    console.log("in mannustorage.fetchAllMannu()");

    return this.http.get<Mannu[]>(
      FIREBASE_DB_URL + FIREBASE_DB_URL_SUFFIX)
      .pipe(
        tap(mannu => {
          const mannuArray = [];
          Object.entries(mannu).forEach((element) => {
            mannuArray.push({ ...element[1], id: element[0] })
          });
          mannuArray.sort((a, b) => a.expiryDate < b.expiryDate ? 1 : -1)
          this.mannuService.setMannus(mannuArray.slice());
        })
      )
  }

  deleteMannu(mannu: Mannu) {
    const url = FIREBASE_DB_URL + `/${mannu.id}` + FIREBASE_DB_URL_SUFFIX;

    console.log("in mannustorage.deleteMannu()", mannu, url);

    return this.http.delete(url).pipe(
      tap(() => {
        this.mannuService.deleteMannu(mannu.id);
      })
    )
  }

  updateMannu(id: string, mannu: Mannu) {

    const url = FIREBASE_DB_URL + `/${id}` + FIREBASE_DB_URL_SUFFIX;

    console.log("in mannustorage.updateMannu()", mannu, url);

    return this.http.patch(url, {...mannu}).pipe(
      tap(() => {
        this.mannuService.updateMannu(id, { ...mannu });
      })
    )
  }
}
