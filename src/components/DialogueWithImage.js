import Dialogue from './Dialogue';

class DialogueWithImage extends Dialogue {
    // Selectors and classes
    _imageSelector = '.dialogue__image';
    _captionSelector = '.dialogue__caption';

    /**
     * Open the dialogue.
     *
     * @param {string} imageURL
     * @param {string} captionText
     * @returns {void}
     * @public
     */
    open({imageURL, captionText}) {
        super.open();

        // Dialogue's image
        const imageElement = this._dialogueElement.querySelector(this._imageSelector);
        imageElement.src = imageURL;
        imageElement.alt = captionText;

        // Dialogue's caption
        const captionElement = this._dialogueElement.querySelector(this._captionSelector);
        captionElement.textContent = captionText;
    }
}

export default DialogueWithImage;
