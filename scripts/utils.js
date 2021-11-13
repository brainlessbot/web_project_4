import Card from './classes/Card.js';
import FormValidator from './classes/FormValidator.js';
import config from './config.js';

// Forms
const cardAddForm = document.forms[config.dialoguesList.cardAdd.formName];
const profileEditForm = document.forms[config.dialoguesList.profileEdit.formName];

// Profile elements
const profileNameElement = document.querySelector(config.profileSettings.nameSelector);
const profileAboutElement = document.querySelector(config.profileSettings.aboutSelector);

// Dialogue elements
const cardAddDialogueElement = document.querySelector(config.dialoguesList.cardAdd.dialogueSelector);
const cardViewDialogueElement = document.querySelector(config.dialoguesList.cardView.dialogueSelector);
const profileEditDialogueElement = document.querySelector(config.dialoguesList.profileEdit.dialogueSelector);

/**
 * Handle dialogue escape keydown event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleDialogueEscapeKeydown = (event) => {
  if (event.key === 'Escape') {
    const dialogueElement = document.querySelector(`.${config.dialogueSettings.dialogueOpenedClass}`);

    if (dialogueElement) {
      closeDialogue(dialogueElement);
    }
  }
}

/**
 * Handle dialogue close clicking event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleDialogueCloseClicking = (event) => {
  const targetElement = event.target;

  if (targetElement.classList.contains(config.dialogueSettings.dialogueClass) ||
    targetElement.classList.contains(config.dialogueSettings.dialogueCloseButtonClass)) {
    closeDialogue(event.currentTarget);
  }
}

/**
 * Show a specific dialogue.
 *
 * @param {Element} dialogueElement
 * @returns {void}
 */
const openDialogue = (dialogueElement) => {
  dialogueElement.classList.add(config.dialogueSettings.dialogueOpenedClass);

  // Add event listeners for closing the dialogue
  document.addEventListener('keydown', handleDialogueEscapeKeydown);
  dialogueElement.addEventListener('click', handleDialogueCloseClicking);
}

/**
 * Hide a specific dialogue.
 *
 * @param {Element} dialogueElement
 * @returns {void}
 */
const closeDialogue = (dialogueElement) => {
  dialogueElement.classList.remove(config.dialogueSettings.dialogueOpenedClass);

  // Remove event listeners for closing the dialogue
  document.removeEventListener('keydown', handleDialogueEscapeKeydown);
  dialogueElement.removeEventListener('click', handleDialogueCloseClicking);
}

/**
 * Handle card-add form submission event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleCardAddFormSubmission = (event) => {
  event.preventDefault();

  const cardObject = new Card({
    title: cardAddForm.elements.title.value,
    image: cardAddForm.elements.image.value
  }, config.cardSettings);
  const cardElement = cardObject.generateCard();

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
 * Add a new created card to the DOM, first in the list.
 *
 * @param {Node} cardElement
 * @returns {void}
 */
const insertCardFirst = (cardElement) => document.querySelector(config.cardsSettings.containerSelector).prepend(cardElement);

/**
 * Add a new created card to the DOM, last in the list.
 *
 * @param {Node} cardElement
 * @returns {void}
 */
const insertCardLast = (cardElement) => document.querySelector(config.cardsSettings.containerSelector).append(cardElement);

/**
 * Handle the opening of card-add dialogue.
 *
 * @returns {void}
 */
export const openCardAddDialogue = () => openDialogue(cardAddDialogueElement);

/**
 * Handle the opening of card-view dialogue.
 *
 * @param {string} cardTitle
 * @param {string} cardImage
 * @returns {void}
 */
export const openCardViewDialogue = (cardTitle, cardImage) => {
  const dialogueCaption = document.querySelector(config.dialoguesList.cardView.captionSelector);
  const dialogueImage = document.querySelector(config.dialoguesList.cardView.imageSelector);

  // Set dialogue's caption
  dialogueCaption.textContent = cardTitle;

  // Set dialogue's image
  dialogueImage.alt = cardTitle;
  dialogueImage.src = cardImage;

  openDialogue(cardViewDialogueElement);
}

/**
 * Handle the opening of profile-edit dialogue.
 *
 * @returns {void}
 */
export const openProfileEditDialogue = () => openDialogue(profileEditDialogueElement);

/**
 * Set default form input values.
 *
 * @returns {void}
 */
export const prepareForms = () => {
  // Profile-edit form
  profileEditForm.elements.name.value = profileNameElement.textContent;
  profileEditForm.elements.about.value = profileAboutElement.textContent;
}

/**
 * Add default event listeners for layout functionality.
 *
 * @returns {void}
 */
export const addLayoutEventListeners = () => {
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
export const addValidationToForms = () => {
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
export const addInitialCards = () => {
  config.initialCards.forEach((cardData) => {
    const cardObject = new Card(cardData, config.cardSettings);
    const cardElement = cardObject.generateCard();

    insertCardLast(cardElement);
  });
}
