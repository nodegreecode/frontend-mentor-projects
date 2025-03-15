import View from "./View";

class ResultsView extends View {
  _tipAmountPerPerson = document.getElementById("tip-amount");
  _totalAmountPerPerson = document.getElementById("total-per-person");
  _resetButton = document.getElementById("reset-button");

  constructor() {
    super();
    this._clearResults();
  }

  _clearResults() {
    this._tipAmountPerPerson.innerText = "$0.00";
    this._totalAmountPerPerson.innerText = "$0.00";
    this._resetButton.classList.add("disabled");
  }

  addHandlerResetResult = function (handler) {
    this._resetButton.addEventListener("click", (event) => {
      this._clearResults();
      handler();
    });
  };

  _updateDisplay(results) {
    this._tipAmountPerPerson.innerText = `$${results.results.tipsPerson}`;
    this._totalAmountPerPerson.innerText = `$${results.results.totalPerson}`;
    results.isActive
      ? this._resetButton.classList.remove("disabled")
      : this._resetButton.classList.add("disabled");
  }

  addHandlerShowResults = function (handler) {
    this._tipsInputs.forEach((tipsInput) => {
      tipsInput.addEventListener("click", (event) => {
        const results = handler();
        this._updateDisplay(results);
      });
    });
  };

  addHandlerShowResultsCustom = function (handler) {
    this._customTipsInput.addEventListener("input", (event) => {
      const results = handler();
      this._updateDisplay(results);
    });
  };
}

export default new ResultsView();
