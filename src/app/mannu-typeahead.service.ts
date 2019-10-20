import { Component, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap
} from "rxjs/operators";

// const WIKI_URL = "https://en.wikipedia.org/w/api.php";
// const PARAMS = new HttpParams({
//   fromObject: {
//     action: "opensearch",
//     format: "json",
//     origin: "*"
//   }
// });

const ONEMG_URL = "https://www.1mg.com/api/v1/search/autocomplete?name=lev&_=1571493296110";
const PARAMS = new HttpParams({
  fromObject: {
    city: "mumbai",
    pageSize: "12",
    types: "all"
  }
});
@Injectable({ providedIn: "root" })
export class MannuTypeaheadService {
  constructor(private http: HttpClient) { }

  search(term: string) {
    if (term === "") {
      return of([]);
    }

    // return this.http
    //   .get(WIKI_URL, { params: PARAMS.set("search", term) })
    //   .pipe(map(response => response[1]));

    PARAMS.set("name", term);
    PARAMS.set("_", Date.now().toString());

    console.log(PARAMS);
    
    return this.http
      .get(ONEMG_URL,
        { params: PARAMS})
      .pipe(map(response => response[1]));
  }
}
