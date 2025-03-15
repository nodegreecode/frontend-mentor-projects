import View from "./View";

class BillView extends View {
  _billInput = document.getElementById("bill");
  _personsInput = document.getElementById("people");
  _billErrorMessage = document.querySelector(".error-message--bill");
  _personsErrorMessage = document.querySelector(".error-message--people");
  _inputData = {};

  constructor() {
    super();
  }

  clearInputs() {
    this._billInput.value = "";
    this._customTipsInput.value = "";
    this._personsInput.value = "";
  }

  _toggleError(isValid, inputElemept, errorMessageElement) {
    if (isValid) {
      inputElemept.classList.remove("invalid");
      errorMessageElement?.classList.remove("error");
    } else {
      inputElemept.classList.add("invalid");
      errorMessageElement?.classList.add("error");
    }
  }

  showError(errors) {
    for (const error in errors) {
      if (error === "billInputIsValid") {
        this._toggleError(
          errors[error],
          this._billInput,
          this._billErrorMessage
        );
      } else if (error === "customTipsInputIsValid") {
        this._toggleError(
          errors[error],
          this._customTipsInput
          //this._personsErrorMessage
        );
      } else if (error === "personsInputIsValid") {
        this._toggleError(
          errors[error],
          this._personsInput,
          this._personsErrorMessage
        );
      }
    }
  }

  _getBillData(tipsValue) {
    const bill = parseFloat(this._billInput.value) || 0;
    const tips = parseInt(tipsValue);
    const customTips = parseInt(this._customTipsInput?.value) || 0;
    const persons = parseInt(this._personsInput.value) || 0;

    this._inputData = {
      bill,
      tips,
      customTips,
      persons,
    };
    return this._inputData;
  }

  addHandlerBillData(handler) {
    this._tipsInputs.forEach((tipsInput) => {
      tipsInput.addEventListener("click", (event) => {
        const data = this._getBillData(event.target.value);
        handler(data);
      });
    });
  }

  addHandlerBillDataCustomTips(handler) {
    this._customTipsInput.addEventListener("input", (event) => {
      const data = this._getBillData(0);
      handler(data);
    });
  }
}

export default new BillView();
