import { serviceNames } from "~/data";

export type ServiceType = keyof typeof serviceNames;
export type RankType = "이병" | "일병" | "상병" | "병장";

export type SalaryResult = {
  earnedSalary: number;
  futureSalary: number;
  totalSavings: number;
  savingsInterest: number;
  matchingFund: number;
  totalAmount: number;
  monthlyCalculations: MonthlyCalculation[];
};

export type MonthlyCalculation = {
  date: Date;
  rank: string;
  salary: number;
  savings: number;
  matchingFund: number;
};
