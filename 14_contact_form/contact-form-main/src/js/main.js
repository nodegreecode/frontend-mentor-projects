document.addEventListener("DOMContentLoaded", () => {
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
   * @type {NodeListOf <HTMLInputElement>} - Reference to the query radio input elements in DOM
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
   * Show form validation error message.
   *
   * @param {HTMLElement} input -  HTML input element.
   * @param {Enumerator} errorType - Enum represesnting error types.
   * @returns {void} This function doesnt return anything.
   */
  function showError(error) {
    const message = ErrorMessages[error.message];
    const formGroup =
      error.field.parentElement.closest("fieldset") ??
      error.field.parentElement;
    formGroup.classList.add("error");
    const errorContainer = formGroup.querySelector("small");
    errorContainer.innerText = message;
    error.field.style.borderColor = "red";
  }

  /**
   * Show success input validation message.
   *
   * @param {HTMLElement} input -  HTML input element.
   * @returns {void} This function doesnt return anything.
   */
  function showSuccess(input) {
    const formGroup =
      input.field.parentElement.closest("fieldset") ??
      input.field.parentElement;
    formGroup.classList.remove("error");
    input.field.style.borderColor = "hsl(186, 15%, 59%)";
  }

  /**
   * Show success form validation message.
   *
   * @returns {void} This function doesnt return anything.
   */
  function showSuccessMessage() {
    form.reset();
    successMessage.removeAttribute("hidden");
  }

  /**
   * Reset form submission after 3s automatically.
   *
   * @returns {void} This function doesnt return anything.
   */
  function resetForm() {
    setTimeout(() => successMessage.setAttribute("hidden", ""), 3000);
  }

  /**
   * EventBus - Central Dispatcher
   */
  const EventBus = {
    events: {},

    on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    },

    emmit(event, data) {
      if (this.events[event]) {
        this.events[event].forEach((callback) => callback(data));
      }
    },
  };

  /**
   * Add events and callbacks
   */
  EventBus.on("reset-form", resetForm);
  EventBus.on("validation-error", showError);
  EventBus.on("validation-success", showSuccess);
  EventBus.on("form-validation", showSuccessMessage);

  /**
   * Check if field is not empty.
   *
   * @param {HTMLInputElement} input - HTML input element.
   * @param {Enumerator} errorType - Enum representing error types.
   * @returns {boolean} - Returns true if the input value is not empty string, otherwise false.
   */
  function checkRequired(input, errorType) {
    if (input.value.trim() == "") {
      EventBus.emmit("validation-error", { field: input, message: errorType });
      return false;
    } else {
      EventBus.emmit("validation-success", { field: input });
      return true;
    }
  }

  /**
   * Check if email is valid.
   *
   * @param {String} value - String value of email.
   * @returns {boolean} - Returns true if the email is valid, otherwise false.
   */
  function isValidEmail(value) {
    const regEx = /^[\w.-]+@[\w.-\.]+[a-zA-Z]{2,}$/;
    return regEx.test(String(value).toLowerCase());
  }

  /**
   * Check if valid email was passed.
   *
   * @param {string} value - Email address.
   * @param {Function} validator - Function checks the email adress against regex.
   * @param {Enumerator} errorType - Enum representing error types.
   * @returns {void} This function doesnt return anything.
   */
  function checkEmail(value, validator, errorType) {
    return validator(value)
      ? showSuccess({ field: email })
      : showError({ field: email, message: errorType });
  }

  /**
   * Check if query type was selected.
   *
   * @param {NodeListOf<HTMLInputElement} queryTypes - HTML input elements.
   * @param {Enumerator} errorType - Enum representing error types.
   * @returns {boolean} - Returns true if the query type is selected, otherwise false.
   */
  function checkQueryType(inputs, errorType) {
    const isSelected = Array.from(inputs).some((radio) => radio.checked);
    if (!isSelected) {
      EventBus.emmit("validation-error", {
        field: inputs[0],
        message: errorType,
      });
      return false;
    } else {
      showSuccess({ field: inputs[0] });
      return true;
    }
  }

  /**
   * Check if consent was checked.
   *
   * @param {HTMLInputElement} input - HTML input element.
   * @param {Enumerator} errorType - Enum representing error types.
   * @returns {boolean} - Returns true if the query type is selected, otherwise false.
   */
  function checkConsent(input, errorType) {
    if (!input.checked) {
      EventBus.emmit("validation-error", {
        field: input,
        message: errorType,
      });
      return false;
    } else {
      showSuccess({ field: input });
      return true;
    }
  }

  /**
   * Adds an event listener to the email input element to track user input.
   * The listener triggers a callback function whenever the input event occurs.
   * The callback function check validity of input using debouncing
   *
   * @event input
   * @param {Event} event - The event object representing the input action.
   */
  email.addEventListener("input", function () {
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => checkEmail(this.value, isValidEmail, ErrorType.INVALID_EMAIL),
      500
    );
  });

  /**
   * Adds an event listener to the form element to validate user input.
   * The listener triggers a callback function whenever the form is submitted.
   *
   * @event input
   * @param {Event} event - The event object representing the input action.
   */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isFirstNameValid = checkRequired(firstName, ErrorType.REQUIRED_FIELD);
    const isLastnameValid = checkRequired(lastName, ErrorType.REQUIRED_FIELD);
    const isEmailValid = checkRequired(email, ErrorType.REQUIRED_FIELD);
    const isQueryTypeSelected = checkQueryType(
      queryTypes,
      ErrorType.REQUIRED_QUERY_TYPE
    );
    const isMessageValid = checkRequired(message, ErrorType.REQUIRED_FIELD);
    const isConsentChecked = checkConsent(consent, ErrorType.REQUIRED_CONSENT);

    if (
      isFirstNameValid &&
      isLastnameValid &&
      isEmailValid &&
      isQueryTypeSelected &&
      isMessageValid &&
      isConsentChecked
    ) {
      EventBus.emmit("form-validation");
    }

    EventBus.emmit("reset-form");
  });
});
