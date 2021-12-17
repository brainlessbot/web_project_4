class UserInfo {
    // Default information
    _id = undefined;

    /**
     * Initialize a user info instance.
     *
     * @constructor
     * @param {string} nameSelector
     * @param {string} aboutSelector
     * @param {string} avatarSelector
     * @returns {void}
     * @public
     */
    constructor({nameSelector, aboutSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    /**
     * Retrieve user's information.
     *
     * @returns {Object}
     * @public
     */
    getUserInfo() {
        return {
            id: this._id,
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
            avatar: this._avatarElement.src
        };
    }

    /**
     * Update user's information.
     *
     * @param {string} _id
     * @param {string} name
     * @param {string} about
     * @param {string} avatar
     * @returns {void}
     * @public
     */
    setUserInfo({_id, name, about, avatar}) {
        this._id = _id || this._id;
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._avatarElement.src = avatar;
    }
}

export default UserInfo;
