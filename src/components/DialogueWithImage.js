import Dialogue from './Dialogue';

class DialogueWithImage extends Dialogue {
    // Selectors and classes
    _imageSelector = '.dialogue__image';
    _captionSelector = '.dialogue__caption';

    /**
     * Initialize a dialogue with image instance.
     *
     * @constructor
     * @param {string} dialogueSelector
     * @returns {void}
     * @public
     */
    constructor(dialogueSelector) {
        super(dialogueSelector);
        this._imageElement = this._dialogueElement.querySelector(this._imageSelector);
        this._captionElement = this._dialogueElement.querySelector(this._captionSelector);
    }

    /**
     * Open the dialogue.
     *
     * @param {string} name
     * @param {string} link
     * @returns {void}
     * @public
     */
    open({name, link}) {
        super.open();

        // Dialogue's image
        this._imageElement.alt = name;
        this._imageElement.src = link;

        // Dialogue's caption
        this._captionElement.textContent = name;
    }
}

export default DialogueWithImage;
