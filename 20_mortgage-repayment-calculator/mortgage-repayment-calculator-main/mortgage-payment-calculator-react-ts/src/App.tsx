import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "./App.css";
import Page from "./components/Page/Page";
import Card from "./components/Card/Card";
import MortgageCalculator from "./components/MgCalculator/MortgageCalculator";
import Footer from "./components/Footer/Footer";

function App() {
  const [monthlyRepayments, setMonthlyRepayments] = useState(0);

  const [totalRepayOverTerm, setTotalRepayOverTerm] = useState(0);

  function handleOnCalculate(
    a: number,
    t: number,
    r: number,
    type: string,
    interestOnly: string
  ) {
    console.log(
      `Calculating repayments...${a} ${t} ${r} ${type} ${interestOnly}`
    );

    // 1. M - total monthly mortgage payment
    // 2. P - principal loan (total amount you borrowed)
    // 3. i - monthly interest rate (annual interest / 12)
    // 4. n - total number of payments (loan terms in years * 12)

    const monthlyInterestRate = r / 100 / 12;

    const totalNumberOfPayments = t * 12;

    const monthlyInterestRatePower =
      (monthlyInterestRate + 1) ** totalNumberOfPayments;

    const numerator = monthlyInterestRate * monthlyInterestRatePower;

    const denominator = (monthlyInterestRate + 1) ** totalNumberOfPayments - 1;

    const monthlyPayment = (numerator / denominator) * a;
    setMonthlyRepayments(monthlyPayment);

    const totalRepay = monthlyPayment * totalNumberOfPayments;
    setTotalRepayOverTerm(totalRepay);
  }

  return (
    <>
      <Page
        card={
          <Card
            children={<MortgageCalculator onCalculate={handleOnCalculate} />}
          />
        }
        footer={<Footer />}
      />
      <div>{`Monthly Repayments: ${monthlyRepayments}`}</div>
      <div>{`Total repay: ${totalRepayOverTerm}`}</div>
    </>
  );
}

export default App;

/**
 * 
### The Core Concept: An Amortizing Loan
A standard mortgage is an **amortizing loan**. This means your monthly payment is designed to:
1.  Pay the interest charged for that period.
2.  Pay down a portion of the original loan amount (the **principal**).

Over the life of the loan, the portion of your payment that goes toward interest decreases, while the portion that goes toward the principal increases. 
This process is called **amortization**.

---

### The Mathematical Formula

The standard formula used by virtually every mortgage calculator is the **Amortization Formula**:

```math
M = P \ frac{ i(1 + i)^n }{ (1 + i)^n - 1 }
```

**Where:**

*   **`M`** = Total monthly mortgage payment
*   **`P`** = Principal loan amount (the total amount you borrowed)
*   **`i`** = Monthly interest rate (Annual interest rate ÷ 12)
*   **`n`** = Total number of payments (Loan term in years × 12)

---

### Step-by-Step Calculation Walkthrough

Let's use a concrete example:

*   **Loan Amount (`P`):** $300,000
*   **Interest Rate:** 6% annually
*   **Loan Term:** 30 years

**Step 1: Find the Monthly Interest Rate (`i`)**
Take the annual rate and divide it by 12.
*   `i` = 6% / 12 = 0.06 / 12 = **0.005**

**Step 2: Find the Total Number of Payments (`n`)**
Take the loan term in years and multiply by 12.
*   `n` = 30 years × 12 = **360 payments**

**Step 3: Plug the values into the formula**

*   `(1 + i)` = `(1 + 0.005)` = `1.005`
*   `(1 + i)^n` = `1.005^360` ≈ **6.022575**
*   Now the numerator: `i * (1 + i)^n` = `0.005 * 6.022575` ≈ `0.030112875`
*   And the denominator: `(1 + i)^n - 1` = `6.022575 - 1` = `5.022575`
*   Finally, divide: `0.030112875 / 5.022575` ≈ **0.0059955**
*   Multiply by the principal (`P`): `0.0059955 * 300,000` = **$1,798.65**

**Result:** The monthly principal and interest payment is **$1,798.65**.

---

### What About the Full Payment (PITI)?

The calculation above only covers **Principal & Interest**. A full monthly mortgage payment often includes two other components, abbreviated as **PITI**:

*   **P**rincipal
*   **I**nterest
*   **T**axes (Property Taxes)
*   **I**nsurance (Homeowner's Insurance)

Calculators that show a "full payment" will estimate these as well:

*   **Property Taxes:** Annual tax bill / 12
*   **Homeowner's Insurance:** Annual insurance premium / 12

If your down payment was less than 20%, you'll also likely have **PMI (Private Mortgage Insurance)**, which is also added to the monthly payment.

**Example (Continuing from above):**
*   Annual Property Taxes: $4,000 → Monthly = $333.33
*   Annual Insurance: $1,200 → Monthly = $100.00
*   PMI: $150/month (estimated)

**Total Monthly Payment (PITI + PMI):**
$1,798.65 (P&I) + $333.33 (T) + $100.00 (I) + $150.00 (PMI) = **$2,381.98**

---

### How an Amortization Schedule Works

This is the table that shows the life of your loan. The calculator creates this by repeating a process for each payment:

1.  **Calculate Interest for the Period:** `Outstanding Principal * Monthly Interest Rate`
    *   For the first payment: $300,000 * 0.005 = **$1,500**
2.  **Calculate Principal Paid:** `Total Payment - Interest Paid`
    *   $1,798.65 - $1,500 = **$298.65**
3.  **Calculate New Balance:** `Old Balance - Principal Paid`
    *   $300,000 - $298.65 = **$299,701.35**

This new balance ($299,701.35) becomes the starting point for the next month's calculation. 
You repeat these three steps 360 times until the balance reaches $0.

### Key Takeaways

*   The core calculation is based on a standard financial formula for amortizing loans.
*   The "magic" of a mortgage is that the payment is fixed, but the split between principal and interest changes over time.
*   Online calculators do all this math instantly, but they are making estimates. Your final payment will be determined by your lender.
*   More advanced calculators can factor in extra payments, different compounding periods, and other variables.

Understanding this process empowers you to see how even a small extra payment each month can significantly reduce the total interest you pay 
and shorten the life of your loan.

 * 
 */
