import * as model from "./model";
import billView from "./views/billView";
import resultsView from "./views/resultsView";

/* CONTROL METHODS */
const constrolResultsReset = function () {
  let data = {
    bill: {},
    isActive: false,
    errors: {},
    results: {},
  };
  billView.clearInputs();
  model.clearData(data);
};

const controlBillData = function (data) {
  model.loadBillData(data);
  billView.showError(model.state.errors);
};

const controlResults = function () {
  model.calculateTips(model.state);
  const resultsObject = model.loadResults();
  return resultsObject;
};

/* Listening For Events - SubscruberConsumer Events */
const init = function () {
  billView.addHandlerBillData(controlBillData);
  billView.addHandlerBillDataCustomTips(controlBillData);
  resultsView.addHandlerShowResults(controlResults);
  resultsView.addHandlerShowResultsCustom(controlResults);
  resultsView.addHandlerResetResult(constrolResultsReset);
};

init();
