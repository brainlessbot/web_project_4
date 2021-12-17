import Api from '../components/Api';
import Card from '../components/Card';
import DialogueWithConfirmation from '../components/DialogueWithConfirmation';
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
    dialogueProfileChangePictureSelector,
    dialogueProfileEditSelector,
    errorSelector,
    errorVisibleClass,
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

    api.addCard({
        name: inputsList.title.value,
        link: inputsList.image.value
    })
        .then(response => cardsContainer.addElementFirst(
            createCard(response)
        ))
        .catch(handleServerError)
        .finally(() => {
            dialogueCardAdd.close();
            dialogueCardAdd.setLoadingState(false);
        });
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
 * Create an instance of DialogueWithForm for the profile-change-picture dialogue.
 *
 * @type {DialogueWithForm}
 */
const dialogueProfileChangePicture = new DialogueWithForm(dialogueProfileChangePictureSelector, inputsList => {
    dialogueProfileChangePicture.setLoadingState(true);

    api.updateUserAvatar({
        avatar: inputsList.avatar.value
    })
        .then(response => userInfo.setUserInfo(response))
        .catch(handleServerError)
        .finally(() => {
            dialogueProfileChangePicture.close();
            dialogueProfileChangePicture.setLoadingState(false);
        });
});

/**
 * Create an instance of DialogueWithForm for the profile-edit dialogue.
 *
 * @type {DialogueWithForm}
 */
const dialogueProfileEdit = new DialogueWithForm(dialogueProfileEditSelector, inputsList => {
    dialogueProfileEdit.setLoadingState(true);

    api.updateUserInfo({
        name: inputsList.name.value,
        about: inputsList.about.value
    })
        .then(response => userInfo.setUserInfo(response))
        .catch(handleServerError)
        .finally(() => {
            dialogueProfileEdit.close();
            dialogueProfileEdit.setLoadingState(false);
        });
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
const handleServerError = error => {
    const errorElement = document.querySelector(errorSelector);

    // Set error's information
    errorElement.textContent = error;
    errorElement.classList.add(errorVisibleClass);

    // Hide the error after 5 seconds
    setTimeout(() => errorElement.classList.remove(errorVisibleClass), 5 * 1000);

    // Also, log the error to the console
    console.error(error);
};

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
                        .catch(handleServerError);
                } else {
                    api.likeCard(cardId)
                        .then(response => card.updateLikes(response))
                        .catch(handleServerError);
                }
            },
            handleRemoveClick: cardId => {
                dialogueCardRemove.open(() => {
                    api.deleteCard(cardId)
                        .then(() => card.removeElement())
                        .catch(handleServerError)
                        .finally(() => dialogueCardRemove.close());
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
buttonProfileChangePicture.addEventListener('click', () => {
    dialogueProfileChangePicture.setInputValues(userInfo.getUserInfo());
    dialogueProfileChangePicture.open();
});

// Connect the profile-edit button to the related dialogue
const buttonProfileEdit = document.querySelector(buttonProfileEditSelector);
buttonProfileEdit.addEventListener('click', () => {
    dialogueProfileEdit.setInputValues(userInfo.getUserInfo());
    dialogueProfileEdit.open();
});

loadInitialData();
addValidationToForms();
