export let state = {
  bill: {},
  isActive: false,
  errors: {},
  results: {},
};

/* CLEAR MODEL */
export const clearData = function (data) {
  updateState(data);
};

/* VALIDATE DATA */
const validateBillData = function (data) {
  const validationRules = {
    bill: /^[1-9]\d*(\.\d{2})?$/,
    persons: /^[1-9]\d*?$/,
    customTips: /^[1-9]\d*?$/,
  };

  const validatedData = {
    bill: { bill: 0, tips: 0, customTips: 0, persons: 0 },
    errors: {},
    isActive: false,
  };

  for (const [key, rule] of Object.entries(validationRules)) {
    if (key === "customTips" && !data.customTips) {
      validatedData.errors[`${key}InputIsValid`] = true;
    } else {
      validatedData.errors[`${key}InputIsValid`] = rule.test(data[key]);
    }
  }

  if (Object.values(validatedData.errors).some((isValid) => !isValid)) {
    return validatedData;
  }

  validatedData.isActive = true;
  validatedData.bill = {
    bill: data.bill,
    tips: data.tips,
    customTips: data.customTips,
    persons: data.persons,
  };
  return validatedData;
};

/* UPDATE STATE OBJECT*/
const updateState = function (data) {
  state = data;
};

/* CALCULATE TIPS*/
export const calculateTips = function (billObject) {
  const result = {
    tipsPerson: "0.00",
    totalTips: "0.00",
    totalPerson: "0.00",
  };

  for (const error in billObject.errors) {
    if (!billObject.errors[error]) {
      state.results = result;
      return;
    }
  }

  const { bill, customTips, persons, tips } = billObject.bill;
  const currentTips = tips > customTips ? tips : customTips;

  if (bill > 0 && currentTips > 0 && persons > 0) {
    const tipsTotal = (bill * currentTips) / 100;
    result.totalTips = +tipsTotal.toFixed(2);

    const totalPerPerson = (bill + tipsTotal) / persons;
    result.totalPerson = +totalPerPerson.toFixed(2);

    const tipsPerPerson = tipsTotal / persons;
    result.tipsPerson = +tipsPerPerson.toFixed(2);
  }

  state.results = result;
};

/* GET BILL DATA */
export const loadBillData = function (data) {
  const validatedData = validateBillData(data);
  updateState(validatedData);
};

/* LOAD CALCULATION RESULS */
export const loadResults = function () {
  return state;
};
