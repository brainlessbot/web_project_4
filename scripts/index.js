import Card from './classes/Card.js';
import FormValidator from './classes/FormValidator.js';
import config from './config.js';
import {openDialogue, closeDialogue} from './utils.js';

// Forms
const cardAddForm = document.forms[config.dialoguesList.cardAdd.formName];
const profileEditForm = document.forms[config.dialoguesList.profileEdit.formName];

// Profile elements
const profileNameElement = document.querySelector(config.profileSettings.nameSelector);
const profileAboutElement = document.querySelector(config.profileSettings.aboutSelector);

// Dialogue elements
const cardAddDialogueElement = document.querySelector(config.dialoguesList.cardAdd.dialogueSelector);
const profileEditDialogueElement = document.querySelector(config.dialoguesList.profileEdit.dialogueSelector);

// Card elements
const cardsContainerElement = document.querySelector(config.cardsSettings.containerSelector);

/**
 * Create a card element from data.
 *
 * @param {Object} cardData
 * @returns {Node}
 */
const createCard = (cardData) => (new Card(cardData, config.cardSettings)).generateCard();

/**
 * Add a new created card to the DOM, first in the list.
 *
 * @param {Node} cardElement
 * @returns {void}
 */
const insertCardFirst = (cardElement) => cardsContainerElement.prepend(cardElement);

/**
 * Add a new created card to the DOM, last in the list.
 *
 * @param {Node} cardElement
 * @returns {void}
 */
const insertCardLast = (cardElement) => cardsContainerElement.append(cardElement);

/**
 * Handle card-add form submission event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleCardAddFormSubmission = (event) => {
  event.preventDefault();

  const cardElement = createCard({
    title: cardAddForm.elements.title.value,
    image: cardAddForm.elements.image.value
  });
  insertCardFirst(cardElement);

  cardAddForm.reset();

  closeDialogue(cardAddDialogueElement);
}

/**
 * Handle profile-edit form submission event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleProfileEditFormSubmission = (event) => {
  event.preventDefault();

  profileNameElement.textContent = profileEditForm.elements.name.value;
  profileAboutElement.textContent = profileEditForm.elements.about.value;

  closeDialogue(profileEditDialogueElement);
}

/**
 * Handle the opening of card-add dialogue.
 *
 * @returns {void}
 */
const openCardAddDialogue = () => openDialogue(cardAddDialogueElement);

/**
 * Handle the opening of profile-edit dialogue.
 *
 * @returns {void}
 */
const openProfileEditDialogue = () => openDialogue(profileEditDialogueElement);

/**
 * Set default form input values.
 *
 * @returns {void}
 */
const prepareForms = () => {
  // Profile-edit form
  profileEditForm.elements.name.value = profileNameElement.textContent;
  profileEditForm.elements.about.value = profileAboutElement.textContent;
}

/**
 * Add default event listeners for layout functionality.
 *
 * @returns {void}
 */
const addLayoutEventListeners = () => {
  // Card-add dialogue button
  document.querySelector(config.profileSettings.addButtonSelector).addEventListener('click', openCardAddDialogue);

  // Profile-edit dialogue button
  document.querySelector(config.profileSettings.editButtonSelector).addEventListener('click', openProfileEditDialogue);

  // Card-add dialogue form
  cardAddForm.addEventListener('submit', handleCardAddFormSubmission);

  // Profile-edit dialogue form
  profileEditForm.addEventListener('submit', handleProfileEditFormSubmission);
}

/**
 * Enable forms validation.
 *
 * @returns {void}
 */
const addValidationToForms = () => {
  const formsList = Array.from(document.querySelectorAll(config.validationSettings.formSelector));

  formsList.forEach((formElement) => {
    const validatorObject = new FormValidator(formElement, config.validationSettings);
    validatorObject.enableValidation();
  });
}

/**
 * Create and add initial cards to the DOM.
 *
 * @returns {void}
 */
const addInitialCards = () => {
  config.initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    insertCardLast(cardElement);
  });
}

/**
 * Perform startup tasks.
 *
 * @returns {void}
 */
const initializeApp = () => {
  prepareForms();
  addLayoutEventListeners();
  addValidationToForms();
  addInitialCards();
}

// Bring it on :)
initializeApp();
