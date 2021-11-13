class FormValidator {
  /**
   * Initialize a new form validator instance.
   *
   * @param {Element} formElement
   * @param {object} validationSettings
   * @returns {void}
   * @public
   */
  constructor(formElement, validationSettings) {
    this._formElement = formElement;
    this._validationSettings = validationSettings;
  }

  /**
   * Enable form validation.
   *
   * @returns {void}
   * @public
   */
  enableValidation() {
    this._analyzeForm();
    this._toggleSubmitButtonState();

    // Go through the inputs list, and attach to each an event listener which watches for changes
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
      });
    });

    // Make the submit button disabled again after the form is reset
    this._formElement.addEventListener('reset', () => this._makeSubmitButtonDisabled());
  }

  /**
   * Analyze the passed form element.
   *
   * @returns {void}
   * @private
   */
  _analyzeForm() {
    // Get all the inputs
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));

    // Get the submit button
    this._submitButtonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
  }

  /**
   * Determine whether an input has an error.
   *
   * @param {Element} inputElement
   * @returns {void}
   * @private
   */
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /**
   * Make an input error visible.
   *
   * @param {Element} inputElement
   * @param {string} errorMessage
   * @returns {void}
   * @private
   */
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._getInputErrorElement(inputElement);

    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.classList.add(this._validationSettings.errorVisibleClass);
    errorElement.textContent = errorMessage;
  }

  /**
   * Make an input error hidden.
   *
   * @param inputElement
   * @returns {void}
   * @private
   */
  _hideInputError(inputElement) {
    const errorElement = this._getInputErrorElement(inputElement);

    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorVisibleClass);
    errorElement.textContent = null;
  }

  /**
   * Retrieve the error element of a specific input element.
   *
   * @param {Element} inputElement
   * @returns {Element}
   * @private
   */
  _getInputErrorElement(inputElement) {
    const errorSelector = this._validationSettings.inputErrorSelector
      .replace('%formId', this._formElement.id)
      .replace('%inputName', inputElement.name);

    return this._formElement.querySelector(errorSelector);
  }

  /**
   * Determine the state of the submit button (active / disabled).
   *
   * @returns {void}
   * @private
   */
  _toggleSubmitButtonState() {
    this._hasInvalidInput() ? this._makeSubmitButtonDisabled() : this._makeSubmitButtonActive();
  }

  /**
   * Check whether all inputs are valid.
   *
   * @returns {boolean}
   * @private
   */
  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => !inputElement.validity.valid);
  }

  /**
   * Make the submit button active.
   *
   * @returns {void}
   * @private
   */
  _makeSubmitButtonActive() {
    this._submitButtonElement.classList.remove(this._validationSettings.inactiveButtonClass);
    this._submitButtonElement.disabled = false;
  }

  /**
   * Make the submit button disabled.
   *
   * @returns {void}
   * @private
   */
  _makeSubmitButtonDisabled() {
    this._submitButtonElement.classList.add(this._validationSettings.inactiveButtonClass);
    this._submitButtonElement.disabled = true;
  }
}

export default FormValidator;
