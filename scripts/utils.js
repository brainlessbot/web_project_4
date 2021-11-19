import config from './config.js';

// Dialogue elements
const cardViewDialogueElement = document.querySelector(config.dialoguesList.cardView.dialogueSelector);

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
export const openDialogue = (dialogueElement) => {
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
export const closeDialogue = (dialogueElement) => {
  dialogueElement.classList.remove(config.dialogueSettings.dialogueOpenedClass);

  // Remove event listeners for closing the dialogue
  document.removeEventListener('keydown', handleDialogueEscapeKeydown);
  dialogueElement.removeEventListener('click', handleDialogueCloseClicking);
}

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
