"use client";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { SalaryResult, ServiceType } from "~/types";
import { calculateSalary } from "~/calculator";
import { serviceMonths, serviceNames } from "~/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function HomePage() {
  const [serviceType, setServiceType] = useState<ServiceType>("airForce");
  const [dischargeDate, setDischargeDate] = useState("2025-06-17");
  const [result, setResult] = useState<SalaryResult | undefined>(undefined);

  useEffect(() => {
    const calculationResult = calculateSalary(
      serviceType,
      new Date(dischargeDate),
    );
    setResult(calculationResult);
  }, [serviceType, dischargeDate]);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 px-4 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold">군 복무 급여 계산기</h1>
        </CardHeader>
        <CardContent className={"space-y-4"}>
          <div className={"space-y-2"}>
            <Label htmlFor={"service-type"}>복무 종류</Label>
            <Select
              value={serviceType}
              onValueChange={(value) => setServiceType(value as ServiceType)}
            >
              <SelectTrigger className={"w-fit"} id={"service-type"}>
                <SelectValue placeholder="복무 종류 선택" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(serviceNames).map((type) => (
                  <SelectItem key={type} value={type}>
                    {serviceNames[type as ServiceType]} (
                    {serviceMonths[type as ServiceType]}개월)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className={"space-y-2"}>
            <Label htmlFor={"discharge-date"}>전역일</Label>
            <Input
              id={"discharge-date"}
              type="date"
              max={"2999-12-31"}
              placeholder="전역일"
              value={dischargeDate}
              className={"w-32"}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader className={"space-y-2"}>
            <div>
              <div className={"text-xl"}>
                <span>총 금액 </span>
                <span className={"font-bold"}>
                  {result.totalAmount.toLocaleString("ko-KR")}원
                </span>
              </div>

              <p>
                지금까지 받은 급여:{" "}
                {result.earnedSalary.toLocaleString("ko-KR")}원
              </p>
              <p>
                앞으로 받을 급여: {result.futureSalary.toLocaleString("ko-KR")}
                원
              </p>

              <p>납입 원금: {result.totalSavings.toLocaleString("ko-KR")}원</p>
              <p>
                적금 이자: {result.savingsInterest.toLocaleString("ko-KR")}원
              </p>
              <p>매칭지원금: {result.matchingFund.toLocaleString("ko-KR")}원</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={"min-w-[100px] font-semibold"}>
                    날짜
                  </TableHead>
                  <TableHead className={"min-w-[50px] font-semibold"}>
                    계급
                  </TableHead>
                  <TableHead className={"min-w-[100px] font-semibold"}>
                    월급
                  </TableHead>
                  <TableHead className={"min-w-[100px] font-semibold"}>
                    월 납입금
                  </TableHead>
                  <TableHead className={"min-w-[100px] font-semibold"}>
                    매칭지원금
                  </TableHead>
                  <TableHead className={"min-w-[100px] font-semibold"}>
                    누적 월급
                  </TableHead>
                  <TableHead className={"min-w-[100px] font-semibold"}>
                    누적 적금 원금
                  </TableHead>
                  <TableHead className={"min-w-[120px] font-semibold"}>
                    누적 매칭지원금
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.monthlyCalculations.map((calc, index) => {
                  const cumulativeSalary = result.monthlyCalculations
                    .slice(0, index + 1)
                    .reduce((sum, c) => sum + c.salary, 0);
                  const cumulativeSavings = result.monthlyCalculations
                    .slice(0, index + 1)
                    .reduce((sum, c) => sum + c.savings, 0);
                  const cumulativeMatchingFund = result.monthlyCalculations
                    .slice(0, index + 1)
                    .reduce((sum, c) => sum + c.matchingFund, 0);

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {calc.date.toLocaleDateString("ko-KR", {
                          year: "numeric",
                        })}{" "}
                        {calc.date.toLocaleDateString("ko-KR", {
                          month: "long",
                        })}
                      </TableCell>
                      <TableCell>{calc.rank}</TableCell>
                      <TableCell>{calc.salary.toLocaleString()}원</TableCell>
                      <TableCell>{calc.savings.toLocaleString()}원</TableCell>
                      <TableCell>
                        {calc.matchingFund.toLocaleString()}원
                      </TableCell>
                      <TableCell>
                        {cumulativeSalary.toLocaleString()}원
                      </TableCell>
                      <TableCell>
                        {cumulativeSavings.toLocaleString()}원
                      </TableCell>
                      <TableCell>
                        {cumulativeMatchingFund.toLocaleString()}원
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
