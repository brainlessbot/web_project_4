import {openCardViewDialogue} from '../utils.js';

class Card {
  /**
   * Initialize a new card instance.
   *
   * @param {object} cardData
   * @param {object} cardSettings
   * @returns {void}
   * @public
   */
  constructor(cardData, cardSettings) {
    this._title = cardData.title;
    this._image = cardData.image;
    this._cardSettings = cardSettings;
  }

  /**
   * Generate and return a card element.
   *
   * @returns {Node}
   * @public
   */
  generateCard() {
    this._createElementFromTemplate();
    this._setEventListeners();

    // Set card's title
    this._titleElement.textContent = this._title;

    // Set card's image
    this._imageElement.alt = this._title;
    this._imageElement.src = this._image;

    return this._cardElement;
  }

  /**
   * Create a card element from template.
   *
   * @returns {void}
   * @private
   */
  _createElementFromTemplate() {
    this._cardElement = document
      .querySelector(this._cardSettings.templateSelector)
      .content
      .querySelector(this._cardSettings.cardSelector)
      .cloneNode(true);

    this._titleElement = this._cardElement.querySelector(this._cardSettings.titleSelector);
    this._imageElement = this._cardElement.querySelector(this._cardSettings.imageSelector);
    this._likeButtonElement = this._cardElement.querySelector(this._cardSettings.likeButtonSelector);
    this._removeButtonElement = this._cardElement.querySelector(this._cardSettings.removeButtonSelector);
  }

  /**
   * Set card's event listeners.
   *
   * @returns {void}
   * @private
   */
  _setEventListeners() {
    this._imageElement.addEventListener('click', () => this._handleImageClicking());
    this._likeButtonElement.addEventListener('click', () => this._handleLikeClicking());
    this._removeButtonElement.addEventListener('click', () => this._handleRemoveClicking());
  }

  /**
   * Handle card image clicking event.
   *
   * @returns {void}
   * @private
   */
  _handleImageClicking() {
    openCardViewDialogue(this._title, this._image);
  }

  /**
   * Handle card like clicking event.
   *
   * @returns {void}
   * @private
   */
  _handleLikeClicking() {
    this._likeButtonElement.classList.toggle(this._cardSettings.likeButtonActiveClass);
  }

  /**
   * Handle card remove clicking event.
   *
   * @returns {void}
   * @private
   */
  _handleRemoveClicking() {
    this._cardElement.remove();
  }
}

export default Card;
