class UserInfo {
    /**
     * Initialize a new user info instance.
     *
     * @constructor
     * @param {string} nameSelector
     * @param {string} aboutSelector
     * @returns {void}
     * @public
     */
    constructor({nameSelector, aboutSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
    }

    /**
     * Retrieve user's information.
     *
     * @returns {Object}
     * @public
     */
    getUserInfo() {
        return {
            nameText: this._nameElement.textContent,
            aboutText: this._aboutElement.textContent
        };
    }

    /**
     * Update user's information.
     *
     * @param {string} nameText
     * @param {string} aboutText
     * @returns {void}
     * @public
     */
    setUserInfo({nameText, aboutText}) {
        this._nameElement.textContent = nameText;
        this._aboutElement.textContent = aboutText;
    }
}

export default UserInfo;
