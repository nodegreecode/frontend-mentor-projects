import * as model from "./model";
import billView from "./views/billView";
import resultsView from "./views/resultsView";

/* CONTROL METHODS */
const controlBillData = function (data) {
  model.loadBillData(data);
};

const controlResults = function () {
  const resultsObject = model.loadResults();

  return resultsObject;
};

/* Listening For Events - SubscruberConsumer Events */
const init = function () {
  billView.addHandlerBillData(controlBillData);
  resultsView.addHandlerShowResults(controlResults);
};

init();
