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
const cardAddDialogueElements = {
  titleField: cardAddDialogueBlock.querySelector('.dialogue__form-field_type_title'),
  imageField: cardAddDialogueBlock.querySelector('.dialogue__form-field_type_image')
}

// Card-view dialogue definitions
const cardViewDialogueBlock = document.querySelector('.dialogue_type_card-view');
const cardViewDialogueElements = {
  image: cardViewDialogueBlock.querySelector('.dialogue__image'),
  caption: cardViewDialogueBlock.querySelector('.dialogue__caption')
}

// Profile-edit dialogue definitions
const profileEditDialogueBlock = document.querySelector('.dialogue_type_profile-edit');
const profileEditDialogueElements = {
  nameField: profileEditDialogueBlock.querySelector('.dialogue__form-field_type_name'),
  aboutField: profileEditDialogueBlock.querySelector('.dialogue__form-field_type_about')
}

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

/*
 * Show/hide a specific dialogue.
 */
const toggleDialogue = (dialogueBlock) => dialogueBlock.classList.toggle('dialogue_opened');

/*
 * Handle dialogue close button clicking event.
 */
const handleDialogueCloseButtonClicking = (event) => toggleDialogue(event.target.closest('.dialogue'));

/*
 * Add a new created card to the DOM, first in the list.
 */
const insertCardFirst = (cardBlock) => cardsElements.list.prepend(cardBlock);

/*
 * Add a new created card to the DOM, last in the list.
 */
const insertCardLast = (cardBlock) => cardsElements.list.append(cardBlock);

/*
 * Handle card image clicking event.
 */
const handleCardImageClicking = (event) => {
  const clickedCard = event.target.closest('.card');

  const cardTitle = clickedCard.querySelector('.card__title').textContent;
  const cardImage = clickedCard.querySelector('.card__image').src;

  cardViewDialogueElements.image.alt = cardTitle;
  cardViewDialogueElements.image.src = cardImage;

  cardViewDialogueElements.caption.textContent = cardTitle;

  toggleDialogue(cardViewDialogueBlock);
}

/*
 * Handle card like clicking event.
 */
const handleCardLikeClicking = (event) => event.target.classList.toggle('card__like-button_active');

/*
 * Handle card remove clicking event.
 */
const handleCardRemoveClicking = (event) => event.target.closest('.card').remove();

/*
 * Create a new card block.
 */
const createCard = (cardTitle, cardImage) => {
  const cardBlock = cardTemplate.querySelector('.card').cloneNode(true);

  // Set card's image
  const imageElement = cardBlock.querySelector('.card__image');
  imageElement.addEventListener('click', handleCardImageClicking);
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

/*
 * Handle card-add form submission event.
 */
const handleCardAddFormSubmission = (event) => {
  event.preventDefault();

  insertCardFirst(
    createCard(cardAddDialogueElements.titleField.value, cardAddDialogueElements.imageField.value)
  );

  toggleDialogue(cardAddDialogueBlock);
}

/*
 * Handle profile-edit form submission event.
 */
const handleProfileEditFormSubmission = (event) => {
  event.preventDefault();

  profileElements.name.textContent = profileEditDialogueElements.nameField.value;
  profileElements.about.textContent = profileEditDialogueElements.aboutField.value;

  toggleDialogue(profileEditDialogueBlock);
}

/*
 * Handle add button clicking event.
 */
const handleAddButtonClicking = () => {
  cardAddDialogueElements.titleField.value = null;
  cardAddDialogueElements.imageField.value = null;

  toggleDialogue(cardAddDialogueBlock);
}

/*
 * Handle edit button clicking event.
 */
const handleEditButtonClicking = () => {
  profileEditDialogueElements.nameField.value = profileElements.name.textContent;
  profileEditDialogueElements.aboutField.value = profileElements.about.textContent;

  toggleDialogue(profileEditDialogueBlock);
}

/*
 * Perform startup tasks.
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
  cardAddDialogueBlock.addEventListener('submit', handleCardAddFormSubmission);

  // Make edit profile form interactive
  profileEditDialogueBlock.addEventListener('submit', handleProfileEditFormSubmission);

  // Make all dialogues' close buttons interactive
  const closeButtons = document.querySelectorAll('.dialogue__close-button');
  closeButtons.forEach(
    (buttonElement) => buttonElement.addEventListener('click', handleDialogueCloseButtonClicking)
  );
}

// Bring it on :)
initializeApp();