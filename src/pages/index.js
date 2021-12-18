import Api from '../components/Api';
import Card from '../components/Card';
import DialogueWithConfirmation from '../components/DialogueWithConfirmation';
import DialogueWithError from '../components/DialogueWithError';
import DialogueWithForm from '../components/DialogueWithForm';
import DialogueWithImage from '../components/DialogueWithImage';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import {
    apiAuthKey,
    apiBaseUrl,
    buttonCardAddSelector,
    buttonProfileChangePictureSelector,
    buttonProfileEditSelector,
    cardsContainerSelector,
    cardTemplateSelector,
    dialogueCardAddSelector,
    dialogueCardRemoveSelector,
    dialogueCardViewSelector,
    dialogueErrorSelector,
    dialogueProfileChangePictureSelector,
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
const dialogueCardAdd = new DialogueWithForm(dialogueCardAddSelector, inputsList => {
    dialogueCardAdd.setLoadingState(true);

    api.addCard(inputsList)
        .then(response => {
            cardsContainer.addElementFirst(createCard(response));
            dialogueCardAdd.close();
        })
        .catch(error => dialogueError.open(error))
        .finally(() => dialogueCardAdd.setLoadingState(false));
});

/**
 * Create an instance of DialogueWithConfirmation for the card-remove dialogue.
 *
 * @type {DialogueWithConfirmation}
 */
const dialogueCardRemove = new DialogueWithConfirmation(dialogueCardRemoveSelector);

/**
 * Create an instance of DialogueWithImage for the card-view dialogue.
 *
 * @type {DialogueWithImage}
 */
const dialogueCardView = new DialogueWithImage(dialogueCardViewSelector);

/**
 * Create an instance of DialogueWithError for the error dialogue.
 *
 * @type {DialogueWithError}
 */
const dialogueError = new DialogueWithError(dialogueErrorSelector);

/**
 * Create an instance of DialogueWithForm for the profile-change-picture dialogue.
 *
 * @type {DialogueWithForm}
 */
const dialogueProfileChangePicture = new DialogueWithForm(dialogueProfileChangePictureSelector, inputsList => {
    dialogueProfileChangePicture.setLoadingState(true);

    api.updateUserAvatar(inputsList)
        .then(response => {
            userInfo.setUserInfo(response);
            dialogueProfileChangePicture.close();
        })
        .catch(error => dialogueError.open(error))
        .finally(() => dialogueProfileChangePicture.setLoadingState(false));
});

/**
 * Create an instance of DialogueWithForm for the profile-edit dialogue.
 *
 * @type {DialogueWithForm}
 */
const dialogueProfileEdit = new DialogueWithForm(dialogueProfileEditSelector, inputsList => {
    dialogueProfileEdit.setLoadingState(true);

    api.updateUserInfo(inputsList)
        .then(response => {
            userInfo.setUserInfo(response);
            dialogueProfileEdit.close();
        })
        .catch(error => dialogueError.open(error))
        .finally(() => dialogueProfileEdit.setLoadingState(false));
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
        .then(([userResponse, cardsResponse]) => {
            userInfo.setUserInfo(userResponse);
            cardsContainer.renderItems(cardsResponse);
        })
        .catch(error => dialogueError.open(error));
};

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
};

/**
 * Create a card which opens a dialogue when clicked.
 *
 * @param {Object} cardData
 * @returns {Element}
 */
const createCard = cardData => {
    const card = new Card(
        cardData,
        cardTemplateSelector,
        {
            handleImageClick: () => dialogueCardView.open(cardData),
            handleLikeClick: (cardId, isLiked) => {
                if (isLiked) {
                    api.dislikeCard(cardId)
                        .then(response => card.updateLikes(response))
                        .catch(error => dialogueError.open(error));
                } else {
                    api.likeCard(cardId)
                        .then(response => card.updateLikes(response))
                        .catch(error => dialogueError.open(error));
                }
            },
            handleRemoveClick: cardId => {
                dialogueCardRemove.open(() => {
                    api.deleteCard(cardId)
                        .then(() => {
                            card.removeElement();
                            dialogueCardRemove.close();
                        })
                        .catch(error => dialogueError.open(error));
                });
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

// Connect the profile-change-picture button to the related dialogue
const buttonProfileChangePicture = document.querySelector(buttonProfileChangePictureSelector);
buttonProfileChangePicture.addEventListener('click', () => dialogueProfileChangePicture.open());

// Connect the profile-edit button to the related dialogue
const buttonProfileEdit = document.querySelector(buttonProfileEditSelector);
buttonProfileEdit.addEventListener('click', () => {
    dialogueProfileEdit.setInputValues(userInfo.getUserInfo());
    dialogueProfileEdit.open();
});

loadInitialData();
addValidationToForms();
