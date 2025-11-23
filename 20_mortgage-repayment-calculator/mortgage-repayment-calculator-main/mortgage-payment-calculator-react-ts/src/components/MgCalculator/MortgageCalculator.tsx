import styles from "./MortgageCalculator.module.scss";
import { useRef, type FormEvent, useState } from "react";
import { useValidation } from "../../hooks/useValidation";
import { formatters } from "../../utils/formatters";

interface MortgageCalculatorPorps {
  onCalculate: (
    amount: number,
    term: number,
    rate: number,
    type: string,
  ) => void;
  onClearAll: () => void;
  isCalculationDone: boolean;
  mounthlyRepay: number;
  totalRepay: number;
}

export type MortgageFormData = {
  amount: number;
  term: number;
  interestRate: number;
  type: string;
};

function MortgageCalculator({
  onCalculate,
  mounthlyRepay,
  totalRepay,
  onClearAll,
  isCalculationDone,
}: MortgageCalculatorPorps) {
  const amountRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLInputElement>(null);
  const interestRateRef = useRef<HTMLInputElement>(null);

  const [mortgageType, setMotgageType] = useState<string>("repayment");

  const { errors, validateForm, resetErrors } = useValidation();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData: MortgageFormData = {
      amount: +amountRef.current!.value,
      term: +termRef.current!.value,
      interestRate: +interestRateRef.current!.value,
      type: mortgageType,
    };

    const isValid = validateForm(formData);

    if (isValid) {
      onCalculate(
        formData.amount,
        formData.term,
        formData.interestRate,
        mortgageType,
      );
    }
  }

  function handleClearAll() {
    amountRef.current!.value = "";
    termRef.current!.value = "";
    interestRateRef.current!.value = "";
    setMotgageType("repayment");
    onClearAll();
    resetErrors();
  }

  return (
    <div className={`row ${styles["mg-calculator"]}`}>
      <section
        className={`col-12 col-md-6 ${styles["mg-calculator__input-area"]}`}
      >
        <div
          className={`d-flex flex-lg-row flex-column justify-content-lg-between justify-content-start align-items-lg-center align-items-start  ${styles["mg-calculator__controls"]}`}
        >
          <h2 className="fw-bold mb-0">Mortgage Calculator</h2>
          <button
            className="btn btn-link p-0"
            type="button"
            onClick={handleClearAll}
          >
            <span className="small text-end"> Clear All</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles["mg-calculator__form"]}>
          <div className="mb-3">
            <label htmlFor="amount" className="mb-2 small">
              Mortgage Amount
            </label>
            <div
              className={`row g-0 rounded-1 ${styles["form-group"]} ${
                errors.amount?.length > 0 ? styles.error : ""
              }`}
            >
              <span
                className={`col-1 d-flex align-items-center justify-content-center fw-bold ${styles["form-group__icon"]} ${styles["form-group__icon--left"]}`}
              >
                &pound;
              </span>
              <input
                id="amount"
                type="text"
                name="amount"
                className={`col-11 border-0 ${styles["form-group__input"]} ${styles["form-group__input--left"]}`}
                ref={amountRef}
              />
            </div>
            {errors.amount?.length > 0 &&
              errors.amount.map((message, i) => (
                <span className={styles["error-message"]} key={i}>
                  {message}
                </span>
              ))}
          </div>
          <div className="d-flex flex-column flex-sm-row gap-3 mb-3">
            <div>
              <label htmlFor="term" className="mb-2 small">
                Mortgage Term
              </label>
              <div
                className={`row g-0 rounded-1 ${styles["form-group"]} ${
                  errors.term?.length > 0 ? styles.error : ""
                }`}
              >
                <input
                  id="term"
                  type="text"
                  name="term"
                  className={`col-8 border-0 ${styles["form-group__input"]} ${styles["form-group__input--left"]}`}
                  ref={termRef}
                />
                <span
                  className={`col-4 d-flex align-items-center justify-content-center fw-bold ${styles["form-group__icon"]} ${styles["form-group__icon--left"]}`}
                >
                  years
                </span>
              </div>
              {errors.term?.length > 0 &&
                errors.term.map((message, i) => (
                  <span className={styles["error-message"]} key={i}>
                    {message}
                  </span>
                ))}
            </div>
            <div>
              <label htmlFor="interestRate" className="mb-2 small">
                Interest Rate
              </label>
              <div
                className={`row g-0 rounded-1 ${styles["form-group"]} ${
                  errors.interestRate?.length > 0 ? styles.error : ""
                }`}
              >
                <input
                  type="text"
                  id="interestRate"
                  name="interestRate"
                  className={`col-9 border-0 ${styles["form-group__input"]} ${styles["form-group__input--left"]}`}
                  ref={interestRateRef}
                />
                <span
                  className={`col-3 d-flex align-items-center justify-content-center fw-bold ${styles["form-group__icon"]} ${styles["form-group__icon--left"]}`}
                >
                  %
                </span>
              </div>
              {errors.interestRate?.length > 0 &&
                errors.interestRate.map((message, i) => (
                  <span className={styles["error-message"]} key={i}>
                    {message}
                  </span>
                ))}
            </div>
          </div>
          <div className={styles["form-group--double"]}>
            <span className="mb-2 d-inline-block small">Mortgage Type</span>
            <div
              className={`col-12 d-flex align-items-center rounded-1 mb-2 ${styles["form-group"]}`}
            >
              <input
                type="radio"
                name="mortgage-type"
                id="repayment"
                value="repayment"
                checked={mortgageType === "repayment"}
                onChange={(e) => setMotgageType(e.target.value)}
                className="ms-3"
              />
              <label htmlFor="repayment" className="ms-3 fw-bold">
                Repayment
              </label>
            </div>
            <div
              className={`col-12 d-flex align-items-center rounded-1 ${styles["form-group"]}`}
            >
              <input
                type="radio"
                name="mortgage-type"
                id="interest"
                value="interest"
                checked={mortgageType === "interest"}
                onChange={(e) => setMotgageType(e.target.value)}
                className="ms-3"
              />
              <label htmlFor="interest" className="ms-3 fw-bold">
                Interest Only
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={`d-flex gap-2 justify-content-center py-2 rounded-5 fw-bold ${styles.button}`}
          >
            <img src="/images/icon-calculator.svg" alt="Calculator icon" />
            Calculate Repayments
          </button>
        </form>
      </section>
      <section
        className={`col-12 col-md-6 ${styles["mg-calculator__results"]}`}
      >
        {!isCalculationDone && (
          <div className="d-flex flex-column h-100 justify-content-center align-items-center">
            <img
              className={`mb-3 ${styles["results__empty-image"]}`}
              src="/images/illustration-empty.svg"
              alt="Illustration of calculator with pen and papers"
            />
            <h3 className={`fs-5 fw-bold mb-3 ${styles["results__title"]}`}>
              Results shown here
            </h3>
            <p
              className={`w-100 text-center small mb-0 ${styles["results__info-text"]}`}
            >
              Complete the form and click “calculate repayments” to see what
              your monthly repayments would be.
            </p>
          </div>
        )}
        {isCalculationDone && (
          <div>
            <h3 className={`fs-5 fw-bold mb-3 ${styles["results__title"]}`}>
              Your results
            </h3>
            <p
              className={`w-100 text-start small ${styles["results__info-text"]}`}
            >
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              “calculate repayments” again.
            </p>
            <div className={`${styles["results__container"]}`}>
              <div
                className={`w-100 h-100 rounded-1 p-4 ${styles["results__box"]}`}
              >
                <div className={`${styles["results__monthly-repayments"]}`}>
                  <span className="small">Your monthly repayments</span>
                  <p className="fw-bold">
                    {formatters.currencyFormatter(
                      mounthlyRepay,
                      "gb-GB",
                      "GBP",
                    )}
                  </p>
                </div>
                <div className={`${styles["results__total-repay"]}`}>
                  <span className="small">
                    Total you'll repay over the term
                  </span>
                  <p className="fs-5">
                    {" "}
                    {new Intl.NumberFormat("gb-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(totalRepay)}
                  </p>
                </div>
              </div>
              <div
                className={`w-100 h-100 rounded-1 p-2 ${styles["results__box-top"]}`}
              ></div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default MortgageCalculator;
