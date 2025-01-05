import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MortgageFormComponent } from './mortgage-form/mortgage-form.component';

@NgModule({
    declarations: [
        AppComponent,
        MortgageFormComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule, // Add FormsModule here
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
    ],
})
export class AppModule { }
