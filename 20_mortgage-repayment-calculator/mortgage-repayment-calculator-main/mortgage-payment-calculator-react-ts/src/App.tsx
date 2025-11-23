import { useState } from "react";
import "./App.css";
import Page from "./components/Page/Page";
import Card from "./components/Card/Card";
import MortgageCalculator from "./components/MgCalculator/MortgageCalculator";
import Footer from "./components/Footer/Footer";

function App() {
  const [monthlyRepayments, setMonthlyRepayments] = useState(0);
  const [totalRepayOverTerm, setTotalRepayOverTerm] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  function handleOnCalculate(a: number, t: number, r: number, type: string) {
    const monthlyInterestRate = r / 100 / 12;
    const totalNumberOfPayments = t * 12;
    const totalInterest = a * monthlyInterestRate * t;
    const monthlyInterestRatePower =
      (monthlyInterestRate + 1) ** totalNumberOfPayments;
    const numerator = monthlyInterestRate * monthlyInterestRatePower;
    const denominator = (monthlyInterestRate + 1) ** totalNumberOfPayments - 1;

    let monthlyPayment = 0;
    let totalRepay = 0;
    if (type === "repayment") {
      monthlyPayment = a * (numerator / denominator);
      totalRepay = monthlyPayment * totalNumberOfPayments;
    } else {
      monthlyPayment = a * monthlyInterestRate;
      totalRepay = totalInterest + a;
    }
    setMonthlyRepayments(monthlyPayment);
    setTotalRepayOverTerm(totalRepay);
    setIsCalculated(true);
  }

  function handleClearResult() {
    setMonthlyRepayments(0);
    setTotalRepayOverTerm(0);
    setIsCalculated(false);
  }

  return (
    <>
      <Page
        card={
          <Card
            children={
              <MortgageCalculator
                onCalculate={handleOnCalculate}
                mounthlyRepay={monthlyRepayments}
                totalRepay={totalRepayOverTerm}
                onClearAll={handleClearResult}
                isCalculationDone={isCalculated}
              />
            }
          />
        }
        footer={<Footer />}
      />
    </>
  );
}

export default App;
