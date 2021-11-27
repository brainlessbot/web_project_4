import Dialogue from './Dialogue';

class DialogueWithImage extends Dialogue {
    // Selectors and classes
    imageSelector = '.dialogue__image';
    captionSelector = '.dialogue__caption';

    /**
     * Initialize a new dialogue with image instance.
     *
     * @constructor
     * @param {string} dialogueSelector
     * @param {string} imageURL
     * @param {string} captionText
     * @returns {void}
     * @public
     */
    constructor(dialogueSelector, {imageURL, captionText}) {
        super(dialogueSelector);

        this._imageURL = imageURL;
        this._captionText = captionText;
    }

    /**
     * Open the dialogue.
     *
     * @returns {void}
     * @public
     */
    open() {
        super.open();

        // Dialogue's image
        const imageElement = document.querySelector(this.imageSelector);
        imageElement.src = this._imageURL;
        imageElement.alt = this._captionText;

        // Dialogue's caption
        const captionElement = document.querySelector(this.captionSelector);
        captionElement.textContent = this._captionText;
    }
}

export default DialogueWithImage;
