import Dialogue from './Dialogue';

class DialogueWithError extends Dialogue {
    // Configuration
    _hideAfterSeconds = 5;

    // Selectors and classes
    _paragraphSelector = '.dialogue__paragraph_primary';
    _counterSelector = '.dialogue__counter';

    /**
     * Initialize a dialogue with error instance.
     *
     * @constructor
     * @param {string} dialogueSelector
     * @returns {void}
     * @public
     */
    constructor(dialogueSelector) {
        super(dialogueSelector);
        this._paragraphElement = this._dialogueElement.querySelector(this._paragraphSelector);
        this._counterElement = this._dialogueElement.querySelector(this._counterSelector);
    }

    /**
     * Open the dialogue.
     *
     * @param {string} errorMessage
     * @returns {void}
     * @public
     */
    open(errorMessage) {
        super.open();
        this._paragraphElement.textContent = errorMessage;

        // Reset the counter, and update it every second
        this._counterElement.textContent = this._hideAfterSeconds;
        this._intervalId = setInterval(() => {
            this._counterElement.textContent -= 1;
        }, 1000);

        // Hide the error after 5 seconds, and disable the counter
        this._timeoutId = setTimeout(() => this.close(), this._hideAfterSeconds * 1000);

        // In addition to the dialogue, log the error to the console
        console.error(errorMessage);
    }

    /**
     * Close the dialogue.
     *
     * @returns {void}
     * @public
     */
    close() {
        super.close();
        clearInterval(this._intervalId);
        clearTimeout(this._timeoutId);
    }
}

export default DialogueWithError;
