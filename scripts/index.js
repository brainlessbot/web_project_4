import * as utils from './utils.js';

/**
 * Perform startup tasks.
 *
 * @returns {void}
 */
const initializeApp = () => {
  utils.prepareForms();
  utils.addLayoutEventListeners();
  utils.addValidationToForms();
  utils.addInitialCards();
}

// Bring it on :)
initializeApp();
