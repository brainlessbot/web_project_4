import Dialogue from './Dialogue';

class DialogueWithConfirmation extends Dialogue {
    // Selectors and classes
    _buttonSelector = '.dialogue__submit-button';

    /**
     * Initialize a dialogue with alert instance.
     *
     * @constructor
     * @param {string} dialogueSelector
     * @returns {void}
     * @public
     */
    constructor(dialogueSelector) {
        super(dialogueSelector);
        this._buttonElement = this._dialogueElement.querySelector(this._buttonSelector);
    }

    /**
     * Open the dialogue.
     *
     * @param {Function} confirmationCallback
     * @returns {void}
     * @public
     */
    open(confirmationCallback) {
        this._confirmationCallback = confirmationCallback;
        super.open();
    }

    /**
     * Add event listeners to the dialogue.
     *
     * @returns {void}
     * @protected
     */
    setEventListeners() {
        super.setEventListeners();
        this._buttonElement.addEventListener('click', this._confirmationCallback);
    }

    /**
     * Remove event listeners from the dialogue.
     *
     * @returns {void}
     * @protected
     */
    removeEventListeners() {
        super.removeEventListeners();
        this._buttonElement.removeEventListener('click', this._confirmationCallback);
    }
}

export default DialogueWithConfirmation;
