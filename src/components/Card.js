class Card {
    // Selectors and classes
    _cardSelector = '.card';
    _titleSelector = '.card__title';
    _imageSelector = '.card__image';
    _likeButtonSelector = '.card__like-button';
    _likeCounterSelector = '.card__like-counter';
    _removeButtonSelector = '.card__remove-button';
    _likeButtonActiveClass = 'card__like-button_active';

    /**
     * Initialize a card instance.
     *
     * @constructor
     * @param {string} _id
     * @param {string} name
     * @param {string} link
     * @param {Array} likes
     * @param {Object} owner
     * @param {string} templateSelector
     * @param {Function} handleImageClick
     * @param {Function} handleLikeClick
     * @param {Function} handleRemoveClick
     * @param {string} userId
     * @public
     */
    constructor({_id, name, link, likes, owner}, templateSelector, {handleImageClick, handleLikeClick, handleRemoveClick}, userId) {
        // Card's information
        this._id = _id;
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._owner = owner;

        // Card's template
        this._templateSelector = templateSelector;

        // Event handling callbacks
        this._handleImageClick = handleImageClick;
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveClick = handleRemoveClick;

        // The id of the logged-in user
        this._userId = userId;
    }

    /**
     * Generate a card element.
     *
     * @returns {Element}
     * @public
     */
    generateElement() {
        this._createFromTemplate();
        this._setEventListeners();
        this._checkPermissions();
        this.updateLikes();

        // Card's title
        this._titleElement.textContent = this._name;

        // Card's image
        this._imageElement.alt = this._name;
        this._imageElement.src = this._link;

        return this._cardElement;
    }

    /**
     * Remove a card element.
     *
     * @returns {void}
     * @public
     */
    removeElement() {
        this._cardElement.remove();
    }

    /**
     * Update the likes of the card.
     *
     * @param {Array} likes
     * @returns {void}
     * @public
     */
    updateLikes({likes} = {}) {
        // Check if there's an updated response from the server
        this._likes = likes || this._likes;

        // Check if the logged-in user has liked the card, and change its' state accordingly
        this._isLiked() ? this._markLiked() : this._markDisliked();

        // Update the counter
        this._likeCounterElement.textContent = this._likes.length;
    }

    /**
     * Create a card element from defined template.
     *
     * @returns {void}
     * @private
     */
    _createFromTemplate() {
        this._cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(this._cardSelector)
            .cloneNode(true);

        this._titleElement = this._cardElement.querySelector(this._titleSelector);
        this._imageElement = this._cardElement.querySelector(this._imageSelector);
        this._likeButtonElement = this._cardElement.querySelector(this._likeButtonSelector);
        this._likeCounterElement = this._cardElement.querySelector(this._likeCounterSelector);
        this._removeButtonElement = this._cardElement.querySelector(this._removeButtonSelector);
    }

    /**
     * Set event listeners for card's element.
     *
     * @returns {void}
     * @private
     */
    _setEventListeners() {
        this._imageElement.addEventListener('click', this._handleImageClick);
        this._likeButtonElement.addEventListener('click', () => this._handleLikeClick(this._id, this._isLiked()));
        this._removeButtonElement.addEventListener('click', () => this._handleRemoveClick(this._id));
    }

    /**
     * Check whether the currently logged-in user is the owner of the card.
     *
     * @returns {void}
     * @private
     */
    _checkPermissions() {
        // If not, disable the remove button
        if (this._owner._id !== this._userId) {
            this._removeButtonElement.remove();
        }
    }

    /**
     * Check whether the currently logged-in user has liked the card.
     *
     * @returns {boolean}
     * @private
     */
    _isLiked() {
        return this._likes.some(userData => userData._id === this._userId);
    }

    /**
     * Mark the card as liked.
     *
     * @returns {void}
     * @private
     */
    _markLiked() {
        this._likeButtonElement.classList.add(this._likeButtonActiveClass);
    }

    /**
     * Mark the card as disliked.
     *
     * @returns {void}
     * @private
     */
    _markDisliked() {
        this._likeButtonElement.classList.remove(this._likeButtonActiveClass);
    }
}

export default Card;
