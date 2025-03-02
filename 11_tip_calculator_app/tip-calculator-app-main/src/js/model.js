export const state = {
  bill: {},
  isActive: false,
  errors: [],
};

const createBillObject = function (data) {
  if (data) {
    state.isActive = true;
  }
  state.bill = data;
};

const calculateTips = function (bill, tips, persons) {};

export const loadBillData = function (data) {
  createBillObject(data);
};

export const loadResults = function () {
  return state;
};
