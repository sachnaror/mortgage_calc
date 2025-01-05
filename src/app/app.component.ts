import { Component } from '@angular/core';
import { MortgageFormComponent } from './mortgage-form/mortgage-form.component'; // Import the standalone component

@Component({
  selector: 'app-root',
  standalone: true, // Make this component standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MortgageFormComponent] // Import MortgageFormComponent directly
})
export class AppComponent {
  title = 'Mortgage-Calculator';
}
