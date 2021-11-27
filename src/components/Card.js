class Card {
    // Selectors and classes
    _templateSelector = '#card-template';
    _cardSelector = '.card';
    _titleSelector = '.card__title';
    _imageSelector = '.card__image';
    _likeButtonSelector = '.card__like-button';
    _removeButtonSelector = '.card__remove-button';
    _likeButtonActiveClass = 'card__like-button_active';

    /**
     * Initialize new card instance.
     *
     * @constructor
     * @param {string} titleText
     * @param {string} imageURL
     * @param {Function} onClickFunc
     * @public
     */
    constructor({titleText, imageURL}, onClickFunc) {
        this._titleText = titleText;
        this._imageURL = imageURL;
        this._onClickFunc = onClickFunc;

        // Bind the current instance to the event handlers
        this._handleLikeClicking = this._handleLikeClicking.bind(this);
        this._handleRemoveClicking = this._handleRemoveClicking.bind(this);
    }

    /**
     * Generate and return a card element.
     *
     * @returns {Element}
     * @public
     */
    generateElement() {
        this._createElementFromTemplate();
        this._setEventListeners();

        // Card's title
        this._titleElement.textContent = this._titleText;

        // Card's image
        this._imageElement.src = this._imageURL;
        this._imageElement.alt = this._titleText;

        return this._cardElement;
    }

    /**
     * Create a new card element from template.
     *
     * @returns {void}
     * @private
     */
    _createElementFromTemplate() {
        this._cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(this._cardSelector)
            .cloneNode(true);

        this._titleElement = this._cardElement.querySelector(this._titleSelector);
        this._imageElement = this._cardElement.querySelector(this._imageSelector);
        this._likeButtonElement = this._cardElement.querySelector(this._likeButtonSelector);
        this._removeButtonElement = this._cardElement.querySelector(this._removeButtonSelector);
    }

    /**
     * Add event listeners to the card.
     *
     * @returns {void}
     * @private
     */
    _setEventListeners() {
        this._imageElement.addEventListener('click', this._onClickFunc);
        this._likeButtonElement.addEventListener('click', this._handleLikeClicking);
        this._removeButtonElement.addEventListener('click', this._handleRemoveClicking);
    }

    /**
     * Handle card like clicking event.
     *
     * @returns {void}
     * @private
     */
    _handleLikeClicking() {
        this._likeButtonElement.classList.toggle(this._likeButtonActiveClass);
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
