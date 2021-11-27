class Section {
    /**
     * Initialize a new section instance.
     *
     * @constructor
     * @param {Array} itemsList
     * @param {Function} rendererFunc
     * @param {string} containerSelector
     * @returns {void}
     * @public
     */
    constructor({itemsList, rendererFunc}, containerSelector) {
        this._itemsList = itemsList;
        this._rendererFunc = rendererFunc;
        this._containerElement = document.querySelector(containerSelector);
    }

    /**
     * Render all items which were passed at initialization.
     *
     * @returns {void}
     * @public
     */
    renderAllItems() {
        this._itemsList.forEach((item) => this._rendererFunc(item));
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
