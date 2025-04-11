/**
 * @type {HTMLFormElement} - Reference to the form element in DOM
 */
const form = document.getElementById("form");

/**
 * @type {HTMLInputElement} - Reference to the firstname input element in DOM
 */
const firstName = document.getElementById("first-name");

/**
 * @type {HTMLInputElement} - Reference to the  lastname input element in DOM
 */
const lastName = document.getElementById("last-name");

/**
 * @type {HTMLInputElement} - Reference to the email input element in DOM
 */
const email = document.getElementById("email");

/**
 * @type {HTMLInputElement} - Reference to the query radio input elements in DOM
 */
const queryTypes = document.getElementsByName("query-type");

/**
 * @type {HTMLTextAreaElement} - Reference to the message text area element in DOM
 */
const message = document.getElementById("message");

/**
 * @type {HTMLInputElement} - Reference to the consent checkbox input element in DOM
 */
const consent = document.getElementById("consent");

/**
 * @type {HTMLDivElement} - Reference to the success message div element in DOM
 */
const successMessage = document.getElementById("success-message");

/**
 * @enum {String} - Enum for error types
 */
const ErrorType = {
  REQUIRED_FIELD: "REQUIRED_FIELD",
  INVALID_EMAIL: "INVALID_EMAIL",
  REQUIRED_QUERY_TYPE: "REQUIRED_QUERY_TYPE",
  REQUIRED_CONSENT: "REQUIRED_CONSENT",
};

/**
 * @enum {String} - Enum for error messages
 */
const ErrorMessages = {
  [ErrorType.REQUIRED_FIELD]: "This field is required",
  [ErrorType.INVALID_EMAIL]: "Please enter a valid email address",
  [ErrorType.REQUIRED_QUERY_TYPE]: "Please select a query type",
  [ErrorType.REQUIRED_CONSENT]:
    "To submit this form, please consent to being contacted",
};

/**
 * Show input error message.
 *
 * @param {HTMLElement} input -  HTML input element.
 * @param {Enumerator} errorType - Enum represesnting error types.
 * @returns {void} This function doesnt return anything.
 */
function showError(input, errorType) {
  const message = ErrorMessages[errorType];
  const formGroup =
    input.parentElement.closest("fieldset") ?? input.parentElement;
  formGroup.classList.add("error");
  const errorContainer = formGroup.querySelector("small");
  errorContainer.innerText = message;
  input.style.borderColor = "red";
}

/**
 * Show input success.
 *
 * @param {HTMLElement} input -  HTML input element.
 * @returns {void} This function doesnt return anything.
 */
function showSuccess(input) {
  const formGroup =
    input.parentElement.closest("fieldset") ?? input.parentElement;
  formGroup.classList.remove("error");
  input.style.borderColor = "hsl(186, 15%, 59%)";
}

/**
 * Check if email is valid.
 *
 * @param {String} value - String value of email.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
function isValidEmail(value) {
  console.log(value);
  const regEx = /^[\w.-]+@[\w.-\.]+[a-zA-Z]{2,}$/;
  return regEx.test(String(value).toLowerCase());
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Validate firstname
  if (firstName.value === "") {
    showError(firstName, ErrorType.REQUIRED_FIELD);
  } else {
    showSuccess(firstName);
  }
  // Validate lastname
  if (lastName.value === "") {
    showError(lastName, ErrorType.REQUIRED_FIELD);
  } else {
    showSuccess(lastName);
  }
  //Validate email
  if (email.value === "") {
    showError(email, ErrorType.REQUIRED_FIELD);
  } else if (!isValidEmail(email.value)) {
    showError(email, ErrorType.INVALID_EMAIL);
  } else {
    showSuccess(email);
  }
  //Validate query type
  const isSelected = Array.from(queryTypes).some((radio) => radio.checked);
  if (!isSelected) {
    showError(queryTypes[0], ErrorType.REQUIRED_QUERY_TYPE);
  } else {
    showSuccess(queryTypes[0]);
  }

  //Validate message
  if (message.value === "") {
    showError(message, ErrorType.REQUIRED_FIELD);
  } else {
    showSuccess(message);
  }
  //Validate consent
  if (!consent.checked) {
    showError(consent, ErrorType.REQUIRED_CONSENT);
  } else {
    showSuccess(consent);
  }

  form.reset();
  successMessage.removeAttribute("hidden");
});
