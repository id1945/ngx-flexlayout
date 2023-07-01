import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { defineCustomElements } from 'ngx-flexlayout/loader';
defineCustomElements();

@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
