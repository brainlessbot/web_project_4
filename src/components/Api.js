class Api {
    /**
     * Initialize an Api instance.
     *
     * @constructor
     * @param {string} baseUrl
     * @param {string} authKey
     * @returns {void}
     * @public
     */
    constructor(baseUrl, authKey) {
        this._baseUrl = baseUrl;
        this._authKey = authKey;
    }

    /**
     * Get all cards.
     *
     * @returns {Promise}
     * @public
     */
    getAllCards() {
        return this._sendRequest('GET', '/cards').then(this._checkResponse);
    }

    /**
     * Add a new card.
     *
     * @param {string} name
     * @param {string} link
     * @returns {Promise}
     * @public
     */
    addCard({name, link}) {
        return this._sendRequest('POST', '/cards', {
            body: JSON.stringify({name, link})
        }).then(this._checkResponse);
    }

    /**
     * Delete a specific card.
     *
     * @param {string} id
     * @returns {Promise}
     * @public
     */
    deleteCard(id) {
        return this._sendRequest('DELETE', '/cards/' + id).then(this._checkResponse);
    }

    /**
     * Like a specific card.
     *
     * @param {string} id
     * @returns {Promise}
     * @public
     */
    likeCard(id) {
        return this._sendRequest('PUT', '/cards/likes' + id).then(this._checkResponse);
    }

    /**
     * Dislike a specific card.
     *
     * @param {string} id
     * @returns {Promise}
     * @public
     */
    dislikeCard(id) {
        return this._sendRequest('DELETE', '/cards/likes' + id).then(this._checkResponse);
    }

    /**
     * Get user's information.
     *
     * @returns {Promise}
     * @public
     */
    getUserInfo() {
        return this._sendRequest('GET', '/users/me').then(this._checkResponse);
    }

    /**
     * Update user's information.
     *
     * @param {string} name
     * @param {string} about
     * @returns {Promise}
     * @public
     */
    updateUserInfo({name, about}) {
        return this._sendRequest('PATCH', '/users/me', {
            body: JSON.stringify({name, about})
        }).then(this._checkResponse);
    }

    /**
     * Update user's avatar.
     *
     * @param {string} avatar
     * @returns {Promise}
     * @public
     */
    updateUserAvatar({avatar}) {
        return this._sendRequest('PATCH', '/users/me/avatar', {
            body: JSON.stringify({avatar})
        }).then(this._checkResponse);
    }

    /**
     * Handle sending the request to the server.
     *
     * @param {string} method
     * @param {string} targetUrl
     * @param {Object} options
     * @returns {Promise}
     * @private
     */
    _sendRequest(method, targetUrl, options = {}) {
        return fetch(this._baseUrl + targetUrl, {
            method,
            headers: {
                'Authorization': this._authKey,
                'Content-Type': 'application/json'
            },
            ...options
        });
    }

    /**
     * Handle checking the response from the server.
     *
     * @param {Response} response
     * @returns {Promise}
     * @private
     */
    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`An error occurred: ${response.status} ${response.statusText}`);
    }
}

export default Api;
