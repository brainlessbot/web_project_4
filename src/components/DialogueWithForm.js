import Dialogue from './Dialogue';

class DialogueWithForm extends Dialogue {
    /**
     * Initialize a new dialogue with form instance.
     *
     * @constructor
     * @param {string} dialogueSelector
     * @param {string} formName
     * @param {Function} onSubmitFunc
     * @param {Function} defaultDataSource
     * @returns {void}
     * @public
     */
    constructor(dialogueSelector, {formName, onSubmitFunc}) {
        super(dialogueSelector);

        this._formElement = document.forms[formName];
        this._onSubmitFunc = onSubmitFunc;

        // Bind the current instance to the event handler
        this._handleFormSubmission = this._handleFormSubmission.bind(this);
    }

    /**
     * Set default input values.
     *
     * @returns {void}
     * @public
     */
    setInputValues(inputsList) {
        for (const inputName in inputsList) {
            this._formElement.elements[inputName].value = inputsList[inputName];
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

        this._onSubmitFunc(this._getInputValues());
        this._formElement.reset();

        this.close();
    }

    /**
     * Get all the inputs of the form.
     *
     * @returns {Array}
     * @private
     */
    _getInputValues() {
        return this._formElement.elements;
    }
}

export default DialogueWithForm;
