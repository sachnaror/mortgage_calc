import { CommonModule } from '@angular/common'; // Required for *ngIf
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngForm

@Component({
  selector: 'app-mortgage-form',
  standalone: true, // Mark as standalone
  templateUrl: './mortgage-form.component.html',
  styleUrls: ['./mortgage-form.component.css'],
  imports: [CommonModule, FormsModule] // Import required modules
})
export class MortgageFormComponent {
  results = {
    adjustedInterestRate: 0,
    monthlyPayment: 0,
    propertyTax: 0,
    homeInsurance: 0,
    totalMonthlyPayment: 0,
    totalLoanCost: 0
  };

  calculateMortgage(form: any) {
    const loanAmount = parseFloat(form.loanAmount);
    const baseInterestRate = parseFloat(form.interestRate) / 100;
    const loanTerm = parseInt(form.loanTerm, 10);
    const creditScoreFactor = parseFloat(form.creditScore);
    const propertyTypeFactor = parseFloat(form.propertyType);
    const propertyTaxRate = parseFloat(form.propertyTaxRate) / 100;
    const annualInsurance = parseFloat(form.insuranceCost);

    const adjustedInterestRate = baseInterestRate + creditScoreFactor * 0.005 + propertyTypeFactor;

    const monthlyInterestRate = adjustedInterestRate / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPrincipalAndInterest =
      loanAmount *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const monthlyPropertyTax = (loanAmount * propertyTaxRate) / 12;
    const monthlyInsurance = annualInsurance / 12;
    const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance;
    const totalLoanCost = monthlyPrincipalAndInterest * numberOfPayments;

    this.results = {
      adjustedInterestRate: parseFloat((adjustedInterestRate * 100).toFixed(2)),
      monthlyPayment: parseFloat(monthlyPrincipalAndInterest.toFixed(2)),
      propertyTax: parseFloat(monthlyPropertyTax.toFixed(2)),
      homeInsurance: parseFloat(monthlyInsurance.toFixed(2)),
      totalMonthlyPayment: parseFloat(totalMonthlyPayment.toFixed(2)),
      totalLoanCost: parseFloat(totalLoanCost.toFixed(2))
    };
  }
}
