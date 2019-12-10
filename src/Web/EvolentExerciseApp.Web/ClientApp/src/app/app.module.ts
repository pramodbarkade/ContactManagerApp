import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {  ListContactComponent } from './pages/contact/list-contact/list-contact.component';
import {  AddContactComponent } from './pages/contact/add-contact/add-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ListContactComponent,
    AddContactComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ListContactComponent, pathMatch: 'full' },
      { path: 'add', component: AddContactComponent },      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
