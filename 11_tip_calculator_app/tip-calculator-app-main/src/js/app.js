"use strict";

/* VARIABLES/FIELDS */

const billInput = document.getElementById("bill");
const tipAmount = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-per-person");
const numberOfPeople = document.getElementById("people");
const resetButton = document.getElementById("reset-button");
const tips = document.querySelectorAll(".tip-calculator__tips");

/* METHODS */
const countPercentage = function () {};

const fetchTipsPersentage = function () {
  tips.forEach((radio) => {
    radio.addEventListener("click", (e) => console.log(+e.target.value));
  });
};

const enableResetButton = function () {
  resetButton.classList.remove("disabled");
};

const resetCalculation = function () {
  billInput.value = 0;
  numberOfPeople.value = 0;
  tipAmount.innerText = "0.00";
  totalPerPerson.innerText = "0.00";
  resetButton.classList.add("disabled");
};

const convertToNum = function (valueToConvert) {
  if (typeof +valueToConvert === "number") return +valueToConvert;
};

const displayInputValue = function (event, outputElement) {
  const value = event.target.value;
  const convertedValue = convertToNum(value);
  console.log(convertedValue);

  outputElement.innerText = convertedValue;
};

const fetchDataFromInput = function (inputElement, outputElement) {
  inputElement.addEventListener("input", function (e) {
    displayInputValue(e, outputElement);
    enableResetButton();
  });
};

/* LAUNCH APP */
resetCalculation();
fetchDataFromInput(billInput, totalPerPerson);
fetchDataFromInput(numberOfPeople, tipAmount);

resetButton.addEventListener("click", resetCalculation);

fetchTipsPersentage();
