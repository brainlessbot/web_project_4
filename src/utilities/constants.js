export const buttonCardAddSelector = '.profile__add-button';
export const buttonProfileEditSelector = '.profile__edit-button';

export const cardsContainerSelector = '.cards__list';

export const cardTemplateSelector = '#card-template';

export const dialogueCardAddSelector = '.dialogue_type_card-add';
export const dialogueCardViewSelector = '.dialogue_type_card-view';
export const dialogueProfileEditSelector = '.dialogue_type_profile-edit';

export const initialCards = [
    {
        titleText: 'Broadway Street, New York',
        imageURL: new URL('../images/photo-broadway-street.jpg', import.meta.url)
    },
    {
        titleText: 'Hollywood, Los Angeles',
        imageURL: new URL('../images/photo-hollywood.jpg', import.meta.url)
    },
    {
        titleText: 'Lombard Street, San Francisco',
        imageURL: new URL('../images/photo-lombard-street.jpg', import.meta.url)
    },
    {
        titleText: 'Space Needle, Seattle',
        imageURL: new URL('../images/photo-space-needle.jpg', import.meta.url)
    },
    {
        titleText: 'Las Vegas Strip',
        imageURL: new URL('../images/photo-vegas-strip.jpg', import.meta.url)
    },
    {
        titleText: 'Kennedy Space Center, Florida',
        imageURL: new URL('../images/photo-kennedy-space-center.jpg', import.meta.url)
    }
];

export const userInfoAboutSelector = '.profile__subtitle';
export const userInfoNameSelector = '.profile__title-text';

export const validationSettings = {
    formSelector: '.dialogue__form',
    inputSelector: '.dialogue__form-field',
    inputErrorSelector: '.%formId-%inputName-error',
    submitButtonSelector: '.dialogue__submit-button',
    inactiveButtonClass: 'dialogue__submit-button_disabled',
    inputErrorClass: 'dialogue__form-field_has-error',
    errorVisibleClass: 'dialogue__form-error_visible'
};
