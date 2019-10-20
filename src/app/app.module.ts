import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MannuFormComponent } from './mannu-form/mannu-form.component';
import { MannuNameComponent } from './mannu-form/mannu-name/mannu-name.component';
import { HttpClientModule } from '@angular/common/http';
import { MannuListComponent } from './mannu-list/mannu-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule
  ],
  declarations: [
    AppComponent,
    MannuFormComponent,
    MannuNameComponent,
    MannuListComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
