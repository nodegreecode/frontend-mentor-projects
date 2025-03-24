/* EVENT-DRIVEN ARCHITECTURE (Publishe, Subscriber, Handlers, Event Bus) */ document.addEventListener("DOMContentLoaded", ()=>{
    /* VARIABLES */ const ratingFormContainer = document.getElementById("ratingForm");
    const ratingMessageContainer = document.getElementById("thankYouMessage");
    const ratingRadioButtons = document.querySelectorAll('input[type="radio"]');
    const ratingForm = document.getElementById("form");
    const selectedRating = document.getElementById("selecteRating");
    const errorMessage = document.getElementById("submitError");
    /*  CALLBACK FOR HANDLING EVENTS VIA EVENTBUS*/ /**
   * Uncheck radio button.
   * @param {NodeListOf<Element>} radioButtons - All radio buttons.
   */ function uncheckRadioButtons(radioButtons) {
        radioButtons.forEach((radioButton)=>radioButton.parentNode.classList.remove("active"));
    }
    /**
   * Toggle class between two elements
   * @param {HTMLElement} fromElement - First HTML element.
   * @param {HTMLElement} toEleemnt - Second HTML element.
   * @param {string} className - Name of class to transfer.
   */ function toggleClass(firstElement, secondElement, className) {
        firstElement.classList.toggle(className);
        secondElement.classList.toggle(className);
    }
    /**
   * Reset the UI.
   */ function resetUI() {
        setTimeout(()=>{
            toggleClass(ratingFormContainer, ratingMessageContainer, "hidden");
            uncheckRadioButtons(ratingRadioButtons);
            displayValidationError(false);
        }, 3000);
    }
    /**
   * Show selected rating score.
   * @param {number} value - Rating value.
   */ function displayRatingResult(value) {
        const rate = value.rate;
        selectedRating.innerText = rate;
    }
    /**
   * Show or hide error message.
   * @param {boolean} error - Boolean value (true - show, false - hide).
   */ function displayValidationError(error) {
        error ? errorMessage.classList.remove("hidden") : errorMessage.classList.add("hidden");
    }
    /**
   * Check if rating was selected.
   * @param {Event} e - Event.
   * @returns
   */ function validateFormData(e) {
        const ratingIsSelected = document.querySelector("input[name='rate']:checked");
        if (!ratingIsSelected) {
            e.preventDefault();
            displayValidationError(true);
            return false;
        } else return true;
    }
    /**
   * Toggle active class on rating buttons.
   * @param {HTMLInputElement} element - The radio button.
   */ function handleRadioSelect(element) {
        uncheckRadioButtons(ratingRadioButtons);
        if (element) element.nextElementSibling.parentNode.classList.add("active");
    }
    /**
   * Fetch form data.
   * @param {Event} e - Event.
   */ function handleSubmit(e) {
        const isValid = validateFormData(e);
        if (isValid) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            toggleClass(ratingFormContainer, ratingMessageContainer, "hidden");
            displayRatingResult(data);
            ratingForm.reset();
            resetUI();
        }
    }
    /* EVENT BUS - CENTRAL DISPATCHER */ const EventBus = {
        events: {},
        on (event, callback) {
            if (!this.events[event]) this.events[event] = [];
            this.events[event].push(callback);
        },
        emmit (event, data) {
            if (this.events[event]) this.events[event].forEach((callbackFunction)=>callbackFunction(data));
        },
        off (event, callback) {
            this.events[event] = this.events[event].filter((callbackFunction)=>callbackFunction !== callback);
        }
    };
    /* ADD EVENTS AND CALLBACKS */ EventBus.on("radioSelect", handleRadioSelect);
    EventBus.on("formSubmit", handleSubmit);
    /* EMMIT EVENTS - EXECUTE CALLBACKS */ ratingRadioButtons.forEach((ratingRadioButton)=>ratingRadioButton.addEventListener("change", ()=>EventBus.emmit("radioSelect", ratingRadioButton)));
    ratingForm.addEventListener("submit", (event)=>EventBus.emmit("formSubmit", event));
});

//# sourceMappingURL=index.8f0c9192.js.map
