import View from "./View";

class BillView extends View {
  _billInput = document.getElementById("bill");
  _persons = document.getElementById("people");
  _inputData = {};

  constructor() {
    super();
  }

  _getBillData(tipsValue) {
    const bill = this._billInput.value;
    const tips = tipsValue;
    const persons = this._persons.value;
    this._inputData.bill = bill;
    this._inputData.tips = tips;
    this._inputData.persons = persons;
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

  addHandlerBillDataCustomTips() {}
}

export default new BillView();
