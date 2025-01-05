import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-mortgage-form',
  standalone: true,
  templateUrl: './mortgage-form.component.html',
  styleUrls: ['./mortgage-form.component.css'],
  imports: [FormsModule, CommonModule], // Include FormsModule and CommonModule
})
export class MortgageFormComponent {
  formData = {
    loanAmount: null,
    interestRate: null,
    loanTerm: null,
    creditScore: '',
    propertyType: '',
    propertyTaxRate: null,
    insuranceCost: null,
  };

  results: any = null;

  constructor() { }

  onSubmit(): void {
    console.log('Form submitted:', this.formData);

    const loanAmount = this.formData.loanAmount || 0;
    const interestRate = this.formData.interestRate || 0;
    const loanTerm = this.formData.loanTerm || 1;

    const monthlyRate = interestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;

    this.results = {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : parseFloat(monthlyPayment.toFixed(2)),
      totalPayment: isNaN(totalPayment) ? 0 : parseFloat(totalPayment.toFixed(2)),
    };
  }
}
