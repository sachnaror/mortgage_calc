import { Component } from '@angular/core';
import { MortgageFormComponent } from './mortgage-form/mortgage-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MortgageFormComponent], // Import the standalone MortgageFormComponent
})
export class AppComponent {
  title = 'mortgage_calc'; // A simple title property
}
