import { Component, OnInit } from '@angular/core';
import { MannuTypeaheadService } from 'src/app/mannu-typeahead.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-mannu-name',
  templateUrl: './mannu-name.component.html',
  styleUrls: ['./mannu-name.component.css']
})
export class MannuNameComponent implements OnInit {
  model: any;
  searching = false;
  searchFailed = false;
  constructor(private mannuTypeaheadService: MannuTypeaheadService) { }

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term =>
        this.mannuTypeaheadService.search(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );


}
