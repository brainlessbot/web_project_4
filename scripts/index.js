// Cards block definitions
const cardsBlock = document.querySelector('.cards');
const cardsElements = {
  list: cardsBlock.querySelector('.cards__list')
}

// Profile block definitions
const profileBlock = document.querySelector('.profile');
const profileElements = {
  name: profileBlock.querySelector('.profile__title-text'),
  about: profileBlock.querySelector('.profile__subtitle'),
  addButton: profileBlock.querySelector('.profile__add-button'),
  editButton: profileBlock.querySelector('.profile__edit-button')
}

// Card-add dialogue definitions
const cardAddDialogueBlock = document.querySelector('.dialogue_type_card-add');
const cardAddDialogueForm = document.forms['card-add'];

// Card-view dialogue definitions
const cardViewDialogueBlock = document.querySelector('.dialogue_type_card-view');
const cardViewDialogueElements = {
  image: cardViewDialogueBlock.querySelector('.dialogue__image'),
  caption: cardViewDialogueBlock.querySelector('.dialogue__caption')
}

// Profile-edit dialogue definitions
const profileEditDialogueBlock = document.querySelector('.dialogue_type_profile-edit');
const profileEditDialogueForm = document.forms['profile-edit'];

// Templates
const cardTemplate = document.querySelector('#card-template').content;

// The default cards which will be shown
const initialCards = [
  {
    title: 'Broadway Street, New York',
    image: './images/photo-broadway-street.jpg'
  },
  {
    title: 'Hollywood, Los Angeles',
    image: './images/photo-hollywood.jpg'
  },
  {
    title: 'Lombard Street, San Francisco',
    image: './images/photo-lombard-street.jpg'
  },
  {
    title: 'Space Needle, Seattle',
    image: './images/photo-space-needle.jpg'
  },
  {
    title: 'Las Vegas Strip',
    image: './images/photo-vegas-strip.jpg'
  },
  {
    title: 'Kennedy Space Center, Florida',
    image: './images/photo-kennedy-space-center.jpg'
  }
];

/**
 * Handle dialogue escape keydown event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleDialogueEscapeKeydown = (event) => {
  if (event.key === 'Escape') {
    const dialogueBlock = document.querySelector('.dialogue_opened');

    if (dialogueBlock) {
      closeDialogue(dialogueBlock);
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

  if (targetElement.classList.contains('dialogue') ||
    targetElement.classList.contains('dialogue__close-button')) {
    closeDialogue(event.currentTarget);
  }
}

/**
 * Show a specific dialogue.
 *
 * @param {Element} dialogueBlock
 * @returns {void}
 */
const openDialogue = (dialogueBlock) => {
  dialogueBlock.classList.add('dialogue_opened');

  document.addEventListener('keydown', handleDialogueEscapeKeydown);
  dialogueBlock.addEventListener('click', handleDialogueCloseClicking);
}

/**
 * Hide a specific dialogue.
 *
 * @param {Element} dialogueBlock
 * @returns {void}
 */
const closeDialogue = (dialogueBlock) => {
  dialogueBlock.classList.remove('dialogue_opened');

  document.removeEventListener('keydown', handleDialogueEscapeKeydown);
  dialogueBlock.removeEventListener('click', handleDialogueCloseClicking);
}

/**
 * Add a new created card to the DOM, first in the list.
 *
 * @param {Node} cardBlock
 * @returns {void}
 */
const insertCardFirst = (cardBlock) => cardsElements.list.prepend(cardBlock);

/**
 * Add a new created card to the DOM, last in the list.
 *
 * @param {Node} cardBlock
 * @returns {void}
 */
const insertCardLast = (cardBlock) => cardsElements.list.append(cardBlock);

/**
 * Handle card image clicking event.
 *
 * @param {string} cardTitle
 * @param {string} cardImage
 * @returns {void}
 */
const handleCardImageClicking = (cardTitle, cardImage) => {
  cardViewDialogueElements.image.alt = cardTitle;
  cardViewDialogueElements.image.src = cardImage;

  cardViewDialogueElements.caption.textContent = cardTitle;

  openDialogue(cardViewDialogueBlock);
}

/**
 * Handle card like clicking event.
 *
 * @param {Event} event
 * @returns {boolean}
 */
const handleCardLikeClicking = (event) => event.target.classList.toggle('card__like-button_active');

/**
 * Handle card remove clicking event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleCardRemoveClicking = (event) => event.target.closest('.card').remove();

/**
 * Create a new card block.
 *
 * @param {string} cardTitle
 * @param {string} cardImage
 * @returns {Node}
 */
const createCard = (cardTitle, cardImage) => {
  const cardBlock = cardTemplate.querySelector('.card').cloneNode(true);

  // Set card's image
  const imageElement = cardBlock.querySelector('.card__image');
  imageElement.addEventListener('click', () => handleCardImageClicking(cardTitle, cardImage));
  imageElement.alt = cardTitle;
  imageElement.src = cardImage;

  // Set card's title
  const titleElement = cardBlock.querySelector('.card__title');
  titleElement.textContent = cardTitle;

  // Set card's like button
  const likeButton = cardBlock.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleCardLikeClicking);

  // Set card's remove button
  const removeButton = cardBlock.querySelector('.card__remove-button');
  removeButton.addEventListener('click', handleCardRemoveClicking);

  return cardBlock;
}

/**
 * Handle card-add form submission event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleCardAddFormSubmission = (event) => {
  event.preventDefault();

  insertCardFirst(
    createCard(cardAddDialogueForm.elements.title.value, cardAddDialogueForm.elements.image.value)
  );

  cardAddDialogueForm.reset();

  closeDialogue(cardAddDialogueBlock);
}

/**
 * Handle profile-edit form submission event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleProfileEditFormSubmission = (event) => {
  event.preventDefault();

  profileElements.name.textContent = profileEditDialogueForm.elements.name.value;
  profileElements.about.textContent = profileEditDialogueForm.elements.about.value;

  closeDialogue(profileEditDialogueBlock);
}

/**
 * Handle add button clicking event.
 *
 * @returns {void}
 */
const handleAddButtonClicking = () => openDialogue(cardAddDialogueBlock);

/**
 * Handle edit button clicking event.
 *
 * @returns {void}
 */
const handleEditButtonClicking = () => openDialogue(profileEditDialogueBlock);

/**
 * Perform startup tasks.
 *
 * @returns {void}
 */
const initializeApp = () => {
  // Create and add initial cards to the DOM
  initialCards.forEach(
    (cardData) => insertCardLast(createCard(cardData.title, cardData.image))
  );

  // Make add button interactive
  profileElements.addButton.addEventListener('click', handleAddButtonClicking);

  // Make edit button interactive
  profileElements.editButton.addEventListener('click', handleEditButtonClicking);

  // Make add card form interactive
  cardAddDialogueForm.addEventListener('submit', handleCardAddFormSubmission);

  // Make edit profile form interactive
  profileEditDialogueForm.addEventListener('submit', handleProfileEditFormSubmission);

  // Fill edit profile form with default data
  profileEditDialogueForm.elements.name.value = profileElements.name.textContent;
  profileEditDialogueForm.elements.about.value = profileElements.about.textContent;
}

// Bring it on :)
initializeApp();
