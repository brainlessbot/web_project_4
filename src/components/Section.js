class Section {
    /**
     * Initialize a section instance.
     *
     * @constructor
     * @param {string} containerSelector
     * @param {Function} rendererCallback
     * @returns {void}
     * @public
     */
    constructor(containerSelector, rendererCallback) {
        this._containerElement = document.querySelector(containerSelector);
        this._rendererCallback = rendererCallback;
    }

    /**
     * Render items from list.
     *
     * @returns {void}
     * @public
     */
    renderItems(itemsList) {
        itemsList.forEach(item => this._rendererCallback(item));
    }

    /**
     * Add an element to the beginning of the section.
     *
     * @param {Element} element
     * @returns {void}
     * @public
     */
    addElementFirst(element) {
        this._containerElement.prepend(element);
    }

    /**
     * Add an element to the end of the section.
     *
     * @param {Element} element
     * @returns {void}
     * @public
     */
    addElementLast(element) {
        this._containerElement.append(element);
    }
}

export default Section;
