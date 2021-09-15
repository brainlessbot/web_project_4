let dialogue = document.querySelector('.dialogue');
let dialogueForm = document.querySelector('.dialogue__form');

let profileName = document.querySelector('.profile__title-text');
let profileAbout = document.querySelector('.profile__subtitle');

let formName = document.querySelector('.dialogue__form-field_type_name');
let formAbout = document.querySelector('.dialogue__form-field_type_about');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.dialogue__close-button');

/*
 * Toggle dialogue's visibility state.
 */
let toggleDialogue = () => {
  dialogue.classList.toggle('dialogue_opened')
};

/*
 * Initialize the values of the dialogue's form.
 */
let prepareDialogue = () => {
  formName.value = profileName.textContent;
  formAbout.value = profileAbout.textContent;
}

/*
 * Handle the submission of the dialogue's form.
 */
let handleDialogueSubmit = (event) => {
  event.preventDefault();

  profileName.textContent = formName.value;
  profileAbout.textContent = formAbout.value;

  toggleDialogue();
}

// Set up callback functions for buttons
editButton.addEventListener('click', toggleDialogue);
closeButton.addEventListener('click', toggleDialogue);

// Set up callback function for the dialogue's form
dialogueForm.addEventListener('submit', handleDialogueSubmit);

prepareDialogue();
