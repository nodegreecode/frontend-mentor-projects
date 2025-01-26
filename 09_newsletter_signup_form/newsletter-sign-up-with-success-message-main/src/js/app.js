"use strict";

const from = document.getElementById("form");
const emailInput = document.getElementById("email");
const newsletter = document.querySelector(".newsletter__container");
const successMessage = document.querySelector(".success-message");
const formGroupWrapper = document.getElementById("form-group-wrapper");
const successMessageDismissBtn = document.querySelector(
  ".success-message__btn"
);

const validateForm = (e) => {
  e.preventDefault();

  const isValid = /^\S+@\S+$/g;
  const formData = new FormData(e.target);
  const { email } = Object.fromEntries(formData);

  if (email && isValid.test(email)) {
    newsletter.classList.add("hidden");
    successMessage.classList.remove("hidden");
  } else {
    formGroupWrapper.classList.add("error");
  }
};

const desmissMessage = () => {
  successMessage.classList.toggle("hidden");
  setTimeout(() => location.reload(), 700);
};

const resetError = () => {
  formGroupWrapper.classList.remove("error");
};

form.addEventListener("submit", validateForm);
emailInput.addEventListener("input", resetError);
successMessageDismissBtn.addEventListener("click", desmissMessage);
