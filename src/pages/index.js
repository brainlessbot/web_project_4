import Card from '../components/Card';
import DialogueWithForm from '../components/DialogueWithForm';
import DialogueWithImage from '../components/DialogueWithImage';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import {
    buttonCardAddSelector,
    buttonProfileEditSelector,
    cardsContainerSelector,
    dialogueCardAddSelector,
    dialogueCardViewSelector,
    dialogueProfileEditSelector,
    formCardAddName,
    formProfileEditName,
    initialCards,
    userInfoAboutSelector,
    userInfoNameSelector,
    validationSettings
} from '../utilities/constants';
import './index.css';

/**
 * Create a card which opens a dialogue when clicked, and return the prepared element.
 *
 * @param {Object} cardData
 * @returns {Element}
 */
export const createCardWithDialogue = (cardData) => {
    const dialogue = new DialogueWithImage(dialogueCardViewSelector, {
        imageURL: cardData.imageURL,
        captionText: cardData.titleText
    });
    const card = new Card(cardData, () => dialogue.open());

    return card.generateElement();
}

/**
 * Create an instance of FormValidator for each form on the page.
 *
 * @returns {void}
 */
const addValidationToForms = () => {
    const formsList = Array.from(document.querySelectorAll(validationSettings.formSelector));

    formsList.forEach(formElement => {
        const validatorObj = new FormValidator(formElement, validationSettings);

        validatorObj.enableValidation();
    });
}

/**
 * Create an instance of Section for the cards container.
 *
 * @type {Section}
 */
const cardsContainer = new Section({
    itemsList: initialCards,
    rendererFunc: (cardData) => {
        const cardElement = createCardWithDialogue(cardData);

        cardsContainer.addElementLast(cardElement);
    }
}, cardsContainerSelector);

/**
 * Create an instance of DialogueWithForm for the card-add dialogue.
 *
 * @type {DialogueWithForm}
 */
const dialogueCardAdd = new DialogueWithForm(dialogueCardAddSelector, {
    formName: formCardAddName,
    onSubmitFunc: (inputsList) => {
        const cardElement = createCardWithDialogue({
            titleText: inputsList.title.value,
            imageURL: inputsList.image.value
        });

        cardsContainer.addElementFirst(cardElement);
    }
});

/**
 * Create an instance of DialogueWithForm for the profile-edit dialogue.
 *
 * @type {DialogueWithForm}
 */
const dialogueProfileEdit = new DialogueWithForm(dialogueProfileEditSelector, {
    formName: formProfileEditName,
    onSubmitFunc: (inputsList) => {
        userInfo.setUserInfo({
            nameText: inputsList.name.value,
            aboutText: inputsList.about.value
        });
    }
});

/**
 * Create an instance of UserInfo for the user profile.
 *
 * @type {UserInfo}
 */
const userInfo = new UserInfo({
    nameSelector: userInfoNameSelector,
    aboutSelector: userInfoAboutSelector
});

// Connect the card-add button to the related dialogue
const buttonCardAdd = document.querySelector(buttonCardAddSelector);
buttonCardAdd.addEventListener('click', () => dialogueCardAdd.open());

// Connect the profile-edit button to the related dialogue
const buttonProfileEdit = document.querySelector(buttonProfileEditSelector);
buttonProfileEdit.addEventListener('click', () => {
    const defaultValues = userInfo.getUserInfo();

    dialogueProfileEdit.setInputValues({
        name: defaultValues.nameText,
        about: defaultValues.aboutText
    });

    dialogueProfileEdit.open();
});

// Add initial items to the page
cardsContainer.renderAllItems();

// Add validation to all forms
addValidationToForms();
