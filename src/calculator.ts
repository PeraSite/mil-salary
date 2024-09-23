import { salaryTable, serviceMonths } from "~/data";
import {
  MonthlyCalculation,
  RankType,
  SalaryResult,
  ServiceType,
} from "~/types";

export function calculateSalary(
  serviceType: ServiceType,
  dischargeDate: Date,
): SalaryResult {
  const totalMonths = serviceMonths[serviceType];
  const startDate = new Date(dischargeDate);
  startDate.setMonth(startDate.getMonth() - totalMonths);

  const today = new Date();
  let currentDate = new Date(startDate);
  let monthsServed = 0;
  let totalSalary = 0;
  let totalSavings = 0;
  let totalMatchingFund = 0;
  const monthlyCalculations: MonthlyCalculation[] = [];

  while (currentDate <= dischargeDate) {
    const year = currentDate.getFullYear() as keyof typeof salaryTable;
    let rank: RankType;

    if (monthsServed < 2) rank = "이병";
    else if (monthsServed < 8) rank = "일병";
    else if (monthsServed < 14) rank = "상병";
    else rank = "병장";

    const monthlySalary = salaryTable[year]?.[rank] || salaryTable[2025][rank];
    const monthlySavings = year >= 2025 ? 550000 : 400000;

    let matchingFundRate = 0;
    if (year >= 2024) matchingFundRate = 1;
    else if (year === 2023) matchingFundRate = 0.71;
    else if (year === 2022) matchingFundRate = 0.33;
    const monthlyMatchingFund = monthlySavings * matchingFundRate;

    totalSalary += monthlySalary;
    totalSavings += monthlySavings;
    totalMatchingFund += monthlyMatchingFund;

    monthlyCalculations.push({
      date: new Date(currentDate),
      rank,
      salary: monthlySalary,
      savings: monthlySavings,
      matchingFund: monthlyMatchingFund,
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
    monthsServed++;
  }

  const earnedSalary = monthlyCalculations
    .filter((calc) => calc.date <= today)
    .reduce((sum, calc) => sum + calc.salary, 0);

  const futureSalary = monthlyCalculations
    .filter((calc) => calc.date > today)
    .reduce((sum, calc) => sum + calc.salary, 0);

  const totalInterest = totalSavings * 0.05;

  const totalAmount = totalSalary + totalInterest + totalMatchingFund;

  return {
    earnedSalary,
    futureSalary,
    totalSavings: totalSavings,
    savingsInterest: totalInterest,
    matchingFund: totalMatchingFund,
    totalAmount,
    monthlyCalculations,
  };
}
