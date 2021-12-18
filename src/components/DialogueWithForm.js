import Dialogue from './Dialogue';

class DialogueWithForm extends Dialogue {
    // Selectors and classes
    _formSelector = '.dialogue__form';
    _buttonSelector = '.dialogue__submit-button';

    /**
     * Initialize a dialogue with form instance.
     *
     * @constructor
     * @param {string} dialogueSelector
     * @param {Function} submissionCallback
     * @returns {void}
     * @public
     */
    constructor(dialogueSelector, submissionCallback) {
        super(dialogueSelector);

        this._formElement = this._dialogueElement.querySelector(this._formSelector);
        this._buttonElement = this._dialogueElement.querySelector(this._buttonSelector);
        this._submissionCallback = submissionCallback;

        // Bind the current instance to the event handler
        this._handleFormSubmission = this._handleFormSubmission.bind(this);
    }

    /**
     * Close the dialogue.
     *
     * @returns {void}
     * @public
     */
    close() {
        super.close();
        this._formElement.reset();
    }

    /**
     * Set default input values.
     *
     * @param {Object} inputsList
     * @returns {void}
     * @public
     */
    setInputValues(inputsList) {
        for (const inputName in inputsList) {
            if (this._formElement.elements[inputName]) {
                this._formElement.elements[inputName].value = inputsList[inputName];
            }
        }
    }

    /**
     * Set loading state; used when waiting for response from the server.
     *
     * @param {boolean} isLoading
     * @returns {void}
     * @public
     */
    setLoadingState(isLoading) {
        if (isLoading) {
            this._buttonElement.textContent = 'Saving...';
        } else {
            this._buttonElement.textContent = 'Save';
        }
    }

    /**
     * Add event listeners to the dialogue.
     *
     * @returns {void}
     * @protected
     */
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._handleFormSubmission);
    }

    /**
     * Remove event listeners from the dialogue.
     *
     * @returns {void}
     * @protected
     */
    removeEventListeners() {
        super.removeEventListeners();
        this._formElement.removeEventListener('submit', this._handleFormSubmission);
    }

    /**
     * Handle the submission of the form.
     *
     * @param {Event} event
     * @returns {void}
     * @private
     */
    _handleFormSubmission(event) {
        event.preventDefault();
        this._submissionCallback(this._getInputValues());
    }

    /**
     * Get all input values.
     *
     * @returns {Object}
     * @private
     */
    _getInputValues() {
        const inputsList = Array.from(this._formElement.elements);
        const inputValues = {};

        inputsList.forEach(inputElement => {
            inputValues[inputElement.name] = inputElement.value;
        });

        return inputValues;
    }
}

export default DialogueWithForm;
