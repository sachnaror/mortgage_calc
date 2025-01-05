import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mortgage-form',
  standalone: true,
  templateUrl: './mortgage-form.component.html',
  styleUrls: ['./mortgage-form.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
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

  private apiUrl = 'http://localhost:3000/calculate'; // Backend API URL

  constructor(private http: HttpClient) { }

  onSubmit(): void {
    const loanAmount = this.formData.loanAmount || 0;
    const interestRate = this.formData.interestRate || 0;
    const loanTerm = this.formData.loanTerm || 1;
    const creditScoreFactor = this.getCreditScoreFactor(this.formData.creditScore);
    const propertyTypeFactor = this.getPropertyTypeFactor(this.formData.propertyType);
    const propertyTaxRate = this.formData.propertyTaxRate || 0;
    const annualInsurance = this.formData.insuranceCost || 0;

    const adjustedInterestRate = interestRate + creditScoreFactor + propertyTypeFactor;
    const monthlyRate = adjustedInterestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;

    const monthlyPrincipalAndInterest =
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    const monthlyPropertyTax = (loanAmount * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = annualInsurance / 12;

    const totalMonthlyPayment =
      monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance;

    const totalLoanCost = totalMonthlyPayment * numberOfPayments;

    this.results = {
      adjustedInterestRate: adjustedInterestRate.toFixed(2),
      monthlyPrincipalAndInterest: monthlyPrincipalAndInterest.toFixed(2),
      monthlyPropertyTax: monthlyPropertyTax.toFixed(2),
      monthlyInsurance: monthlyInsurance.toFixed(2),
      totalMonthlyPayment: totalMonthlyPayment.toFixed(2),
      totalLoanCost: totalLoanCost.toFixed(2),
    };

    const dataToSave = {
      ...this.formData,
      results: this.results,
    };

    this.http.post(this.apiUrl, dataToSave).subscribe({
      next: (response) => {
        console.log('Data saved successfully:', response);
        alert('Mortgage data saved successfully!');
      },
      error: (error) => {
        console.error('Error saving data:', error);
        alert('Failed to save mortgage data.');
      },
    });
  }

  private getCreditScoreFactor(creditScore: string): number {
    switch (creditScore) {
      case 'Excellent (740+)':
        return -0.5;
      case 'Good (680-739)':
        return 0;
      case 'Fair (620-679)':
        return 0.5;
      case 'Poor (<620)':
        return 1;
      default:
        return 0;
    }
  }

  private getPropertyTypeFactor(propertyType: string): number {
    switch (propertyType) {
      case 'Residential':
        return 0;
      case 'Commercial':
        return 0.2;
      case 'Investment Property':
        return 0.5;
      default:
        return 0;
    }
  }
}
