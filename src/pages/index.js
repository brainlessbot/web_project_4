import Api from '../components/Api';
import Card from '../components/Card';
import DialogueWithForm from '../components/DialogueWithForm';
import DialogueWithImage from '../components/DialogueWithImage';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import {
    apiAuthKey,
    apiBaseUrl,
    buttonCardAddSelector,
    buttonProfileEditSelector,
    cardsContainerSelector,
    cardTemplateSelector,
    dialogueCardAddSelector,
    dialogueCardViewSelector,
    dialogueProfileEditSelector,
    userInfoAboutSelector,
    userInfoAvatarSelector,
    userInfoNameSelector,
    validationSettings
} from '../utilities/constants';
import './index.css';

/*
 * ------------------------------------------------------------------------------------------------
 * INSTANCES
 * ------------------------------------------------------------------------------------------------
 */

/**
 * Create an instance of Api.
 *
 * @type {Api}
 */
const api = new Api(apiBaseUrl, apiAuthKey);

/**
 * Create an instance of Section for the cards container.
 *
 * @type {Section}
 */
const cardsContainer = new Section(
    cardsContainerSelector,
    cardData => cardsContainer.addElementLast(
        createCard(cardData)
    )
);

/**
 * Create an instance of DialogueWithForm for the card-add dialogue.
 *
 * @type {DialogueWithForm}
 */
const dialogueCardAdd = new DialogueWithForm(dialogueCardAddSelector, (inputsList) => {
    api.addCard({
        name: inputsList.title.value,
        link: inputsList.image.value
    })
        .then(response => cardsContainer.addElementFirst(
            createCard(response)
        ))
        .catch(handleServerError)
        .finally(() => dialogueCardAdd.close());
});

/**
 * Create an instance of DialogueWithImage for the card-view dialogue.
 *
 * @type {DialogueWithImage}
 */
const dialogueCardView = new DialogueWithImage(dialogueCardViewSelector);

/**
 * Create an instance of DialogueWithForm for the profile-edit dialogue.
 *
 * @type {DialogueWithForm}
 */
const dialogueProfileEdit = new DialogueWithForm(dialogueProfileEditSelector, (inputsList) => {
    api.updateUserInfo({
        name: inputsList.name.value,
        about: inputsList.about.value
    })
        .then(response => userInfo.setUserInfo(response))
        .catch(handleServerError)
        .finally(() => dialogueProfileEdit.close());
});

/**
 * Create an instance of UserInfo for the user profile.
 *
 * @type {UserInfo}
 */
const userInfo = new UserInfo({
    nameSelector: userInfoNameSelector,
    aboutSelector: userInfoAboutSelector,
    avatarSelector: userInfoAvatarSelector
});

/*
 * ------------------------------------------------------------------------------------------------
 * FUNCTIONS
 * ------------------------------------------------------------------------------------------------
 */

/**
 * Handle an error received from the server.
 *
 * @param {Promise} error
 * @returns {void}
 */
const handleServerError = error => console.error(error);

/**
 * Get the initial data from the server, and update the page accordingly.
 *
 * @returns {void}
 */
const loadInitialData = () => {
    // Display a loading message while waiting for response
    userInfo.setUserInfo({
        ...userInfo.getUserInfo(),
        name: 'Loading...'
    });

    // Order of execution is important here
    Promise
        .all([api.getUserInfo(), api.getAllCards()])
        .then(response => {
            userInfo.setUserInfo(response[0]);
            cardsContainer.renderItems(response[1]);
        })
        .catch(handleServerError);
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
 * Create a card which opens a dialogue when clicked.
 *
 * @param {Object} cardData
 * @returns {Element}
 */
const createCard = (cardData) => {
    const card = new Card(
        cardData,
        cardTemplateSelector,
        {
            handleImageClick: () => dialogueCardView.open(cardData),
            handleLikeClick: (cardId) => {
            },
            handleRemoveClick: (cardId) => {
                api.deleteCard(cardId)
                    .then(() => card.removeElement())
                    .catch(handleServerError);
            }
        },
        userInfo.getUserInfo().id
    );

    return card.generateElement();
}

/*
 * ------------------------------------------------------------------------------------------------
 * EXECUTIONS
 * ------------------------------------------------------------------------------------------------
 */

// Connect the card-add button to the related dialogue
const buttonCardAdd = document.querySelector(buttonCardAddSelector);
buttonCardAdd.addEventListener('click', () => dialogueCardAdd.open());

// Connect the profile-edit button to the related dialogue
const buttonProfileEdit = document.querySelector(buttonProfileEditSelector);
buttonProfileEdit.addEventListener('click', () => {
    dialogueProfileEdit.setInputValues(userInfo.getUserInfo());
    dialogueProfileEdit.open();
});

loadInitialData();
addValidationToForms();
