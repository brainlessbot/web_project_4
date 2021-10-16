/**
 * Make an input error visible.
 *
 * @param {Element} formElement
 * @param {Element} inputElement
 * @param {string} errorMessage
 * @param {Object} validationSettings
 * @returns {void}
 */
const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  const errorElement = formElement.querySelector(`.${formElement.id}-${inputElement.name}-error`);

  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.classList.add(validationSettings.errorVisibleClass);
  errorElement.textContent = errorMessage;
}

/**
 * Make an input error hidden.
 *
 * @param {Element} formElement
 * @param {Element} inputElement
 * @param {Object} validationSettings
 * @returns {void}
 */
const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${formElement.id}-${inputElement.name}-error`);

  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorVisibleClass);
  errorElement.textContent = null;
}

/**
 * Determine whether an input has an error.
 *
 * @param {Element} formElement
 * @param {Element} inputElement
 * @param {Object} validationSettings
 * @returns {void}
 */
const checkInputValidity = (formElement, inputElement, validationSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
}

/**
 * Check whether all inputs are valid.
 *
 * @param {Element[]} inputsList
 * @returns {boolean}
 */
const hasInvalidInput = (inputsList) => inputsList.some((inputElement) => !inputElement.validity.valid);

/**
 * Make a submit button active.
 *
 * @param {Element} buttonElement
 * @param {Object} validationSettings
 * @returns {void}
 */
const makeSubmitButtonActive = (buttonElement, validationSettings) => {
  buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  buttonElement.disabled = false;
}

/**
 * Make a submit button disabled.
 *
 * @param {Element} buttonElement
 * @param {Object} validationSettings
 * @returns {void}
 */
const makeSubmitButtonDisabled = (buttonElement, validationSettings) => {
  buttonElement.classList.add(validationSettings.inactiveButtonClass);
  buttonElement.disabled = true;
}

/**
 * Determine the state of a submit button (active / disabled).
 *
 * @param {Element[]} inputsList
 * @param {Element} buttonElement
 * @param {Object} validationSettings
 * @returns {void}
 */
const toggleSubmitButtonState = (inputsList, buttonElement, validationSettings) => {
  if (hasInvalidInput(inputsList)) {
    makeSubmitButtonDisabled(buttonElement, validationSettings);
  } else {
    makeSubmitButtonActive(buttonElement, validationSettings);
  }
}

/**
 * Enable validation for a specific form.
 *
 * @param {Element} formElement
 * @param {Object} validationSettings
 * @returns {void}
 */
const setValidationEventListeners = (formElement, validationSettings) => {
  const inputsList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  toggleSubmitButtonState(inputsList, buttonElement, validationSettings);

  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationSettings);
      toggleSubmitButtonState(inputsList, buttonElement, validationSettings);
    });
  });

  formElement.addEventListener('reset', () => {
    makeSubmitButtonDisabled(buttonElement, validationSettings);
  });
}

/**
 * Enable validation for all forms.
 *
 * @param {Object} validationSettings
 * @returns {void}
 */
const enableValidation = (validationSettings) => {
  const formsList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formsList.forEach((formElement) => {
    setValidationEventListeners(formElement, validationSettings);
  });
}

// Let it roll!
enableValidation({
  formSelector: '.dialogue__form',
  inputSelector: '.dialogue__form-field',
  submitButtonSelector: '.dialogue__submit-button',
  inactiveButtonClass: 'dialogue__submit-button_disabled',
  inputErrorClass: 'dialogue__form-field_has-error',
  errorVisibleClass: 'dialogue__form-error_visible'
});
