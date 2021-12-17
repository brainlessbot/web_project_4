class Dialogue {
    // Selectors and classes
    _backgroundClass = 'dialogue';
    _closeButtonClass = 'dialogue__close-button';
    _openedClass = 'dialogue_opened';

    /**
     * Initialize a dialogue instance.
     *
     * @constructor
     * @param {string} dialogueSelector
     * @returns {void}
     * @public
     */
    constructor(dialogueSelector) {
        this._dialogueElement = document.querySelector(dialogueSelector);

        // Bind the current instance to the event handlers
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleClickClose = this._handleClickClose.bind(this);
    }

    /**
     * Open the dialogue.
     *
     * @returns {void}
     * @public
     */
    open() {
        this._dialogueElement.classList.add(this._openedClass);
        this.setEventListeners();
    }

    /**
     * Close the dialogue.
     *
     * @returns {void}
     * @public
     */
    close() {
        this._dialogueElement.classList.remove(this._openedClass);
        this.removeEventListeners();
    }

    /**
     * Add event listeners to the dialogue.
     *
     * @returns {void}
     * @protected
     */
    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._dialogueElement.addEventListener('click', this._handleClickClose);
    }

    /**
     * Remove event listeners from the dialogue.
     *
     * @returns {void}
     * @protected
     */
    removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._dialogueElement.removeEventListener('click', this._handleClickClose);
    }

    /**
     * Handle closing the dialogue if "escape" was pressed.
     *
     * @param {Event} event
     * @returns {void}
     * @private
     */
    _handleEscClose(event) {
        (event.key === 'Escape') && this.close();
    }

    /**
     * Handle closing the dialogue if the user clicked on the background / the close button.
     *
     * @param {Event} event
     * @returns {void}
     * @private
     */
    _handleClickClose(event) {
        if (event.target.classList.contains(this._backgroundClass) ||
            event.target.classList.contains(this._closeButtonClass)) {
            this.close();
        }
    }
}

export default Dialogue;
