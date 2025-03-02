import View from "./View";

class ResultsView extends View {
  _tipAmountPerPerson = document.getElementById("tip-amount");
  _totalAmountPerPerson = document.getElementById("total-per-person");
  _resetButton = document.getElementById("reset-button");

  constructor() {
    super();
  }

  addHandlerShowResults = function (handler) {
    this._tipsInputs.forEach((tipsInput) => {
      tipsInput.addEventListener("click", (event) => {
        const results = handler();
        console.log(results);
        this._tipAmountPerPerson.innerText = results.bill.tips;
        this._totalAmountPerPerson.innerText = results.bill.bill;
        results.isActive
          ? this._resetButton.classList.remove("disabled")
          : this._resetButton.classList.add("disabled");
      });
    });
  };
}

export default new ResultsView();
