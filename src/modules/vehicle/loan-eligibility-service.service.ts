import { Injectable } from '@nestjs/common';
import { Valuation } from '../../dbconfig/entity/Valuation.entity';
import { CreateLoanApplicationDto } from './dto/vehicle.dto';

@Injectable()
export class LoanEligibilityService {
  private readonly MIN_LOAN_VALUE = 2500000;
  private readonly MAX_LOAN_VALUE = 50000000;
  private readonly MIN_SALARY_RATIO = 0.3; // 30% of the monthly payment
  private readonly INTEREST_RATES = {
    shortTerm: 0.05,
    mediumTerm: 0.04,
    longTerm: 0.03,
  };

  calculateLoanEligibility(
    valuation: Valuation,
    loanApplication: CreateLoanApplicationDto,
  ): {
    isEligible: boolean;
    repaymentPlan: any[];
    requiredSalary: number;
    calculateLoanDetails: {
      totalAmountWithInterest: number;
      totalInterest: number;
      monthlyPayment: number;
    };
  } {
    const loanValue = valuation.loan_value;
    const loanDurationInMonths = loanApplication.duration;
    const userSalary = parseFloat(String(loanApplication.salary_amount));

    // Check if the loan amount is within the valid range
    const isLoanAmountValid =
      loanValue >= this.MIN_LOAN_VALUE && loanValue <= this.MAX_LOAN_VALUE;

    // Calculate the interest rate based on the duration in years
    const interestRate = this.getInterestRate(loanDurationInMonths / 12);

    // Calculate the monthly payment
    const monthlyPayment = this.calculateMonthlyPayment(
      loanValue,
      interestRate,
      loanDurationInMonths,
    );

    // Check if the salary meets the eligibility criteria
    const isSalaryEligible =
      userSalary >= monthlyPayment * this.MIN_SALARY_RATIO;

    // Check if the monthly payment is feasible given the user's salary
    const isPaymentFeasible = monthlyPayment <= userSalary;

    // Determine eligibility
    const isEligible =
      isLoanAmountValid && isSalaryEligible && isPaymentFeasible;

    // Generate repayment plan
    const repaymentPlan = this.generateRepaymentPlan(
      new Date(),
      loanValue,
      interestRate,
      loanDurationInMonths,
    );

    // Calculate loan details
    const calculateLoanDetails = this.calculateLoanDetails(
      loanValue,
      interestRate,
      loanDurationInMonths,
    );

    // Return the combined result
    return {
      isEligible,
      repaymentPlan,
      requiredSalary: parseFloat(
        (monthlyPayment * this.MIN_SALARY_RATIO).toFixed(2),
      ),
      calculateLoanDetails,
    };
  }

  getInterestRate(durationInYears: number): number {
    if (durationInYears <= 2) return this.INTEREST_RATES.shortTerm;
    if (durationInYears <= 5) return this.INTEREST_RATES.mediumTerm;
    return this.INTEREST_RATES.longTerm;
  }

  calculateMonthlyPayment(
    loanValue: number,
    interestRate: number,
    durationInMonths: number,
  ): number {
    const monthlyRate = interestRate / 12;
    return (
      (loanValue * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -durationInMonths))
    );
  }

  generateRepaymentPlan(
    startDate: Date,
    loanValue: number,
    interestRate: number,
    durationInMonths: number,
  ): any[] {
    const monthlyPayment = this.calculateMonthlyPayment(
      loanValue,
      interestRate,
      durationInMonths,
    );
    const repaymentPlan = [];
    const paymentDate = new Date(startDate);

    for (let i = 0; i < durationInMonths; i++) {
      paymentDate.setMonth(paymentDate.getMonth() + 1);
      repaymentPlan.push({
        payment_date: paymentDate.toISOString().split('T')[0],
        amount: parseFloat(monthlyPayment.toFixed(2)),
      });
    }

    return repaymentPlan;
  }

  calculateLoanDetails(
    loanValue: number,
    interestRate: number,
    durationInMonths: number,
  ): {
    totalAmountWithInterest: number;
    totalInterest: number;
    monthlyPayment: number;
  } {
    const monthlyRate = interestRate / 12;
    const totalPayments = durationInMonths;

    // Calculate monthly payment
    const monthlyPayment =
      (loanValue * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -totalPayments));

    // Calculate total amount with interest
    const totalAmountWithInterest = monthlyPayment * totalPayments;

    // Calculate total interest
    const totalInterest = totalAmountWithInterest - loanValue;

    return {
      totalAmountWithInterest: parseFloat(totalAmountWithInterest.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    };
  }
}
