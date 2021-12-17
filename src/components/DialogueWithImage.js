import Dialogue from './Dialogue';

class DialogueWithImage extends Dialogue {
    // Selectors and classes
    _imageSelector = '.dialogue__image';
    _captionSelector = '.dialogue__caption';

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
        const imageElement = this._dialogueElement.querySelector(this._imageSelector);
        imageElement.alt = name;
        imageElement.src = link;

        // Dialogue's caption
        const captionElement = this._dialogueElement.querySelector(this._captionSelector);
        captionElement.textContent = name;
    }
}

export default DialogueWithImage;
