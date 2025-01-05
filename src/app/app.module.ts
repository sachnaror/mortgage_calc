import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MortgageFormComponent } from './mortgage-form/mortgage-form.component'; // Import the component

@NgModule({
    declarations: [
        AppComponent,         // Root component
        MortgageFormComponent // Declare the MortgageFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
