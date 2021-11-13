const config = {
  initialCards: [
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
  ],

  cardSettings: {
    templateSelector: '#card-template',
    cardSelector: '.card',
    titleSelector: '.card__title',
    imageSelector: '.card__image',
    likeButtonSelector: '.card__like-button',
    removeButtonSelector: '.card__remove-button',
    likeButtonActiveClass: 'card__like-button_active'
  },

  cardsSettings: {
    containerSelector: '.cards__list'
  },

  profileSettings: {
    nameSelector: '.profile__title-text',
    aboutSelector: '.profile__subtitle',
    addButtonSelector: '.profile__add-button',
    editButtonSelector: '.profile__edit-button'
  },

  dialogueSettings: {
    dialogueClass: 'dialogue',
    dialogueOpenedClass: 'dialogue_opened',
    dialogueCloseButtonClass: 'dialogue__close-button'
  },

  dialoguesList: {
    cardAdd: {
      dialogueSelector: '.dialogue_type_card-add',
      formName: 'card-add'
    },
    cardView: {
      dialogueSelector: '.dialogue_type_card-view',
      captionSelector: '.dialogue__caption',
      imageSelector: '.dialogue__image'
    },
    profileEdit: {
      dialogueSelector: '.dialogue_type_profile-edit',
      formName: 'profile-edit',
      nameInputSelector: '.dialogue__form-field_type_name',
      aboutInputSelector: '.dialogue__form-field_type_about'
    }
  },

  validationSettings: {
    formSelector: '.dialogue__form',
    inputSelector: '.dialogue__form-field',
    inputErrorSelector: '.%formId-%inputName-error',
    submitButtonSelector: '.dialogue__submit-button',
    inactiveButtonClass: 'dialogue__submit-button_disabled',
    inputErrorClass: 'dialogue__form-field_has-error',
    errorVisibleClass: 'dialogue__form-error_visible'
  },
}

export default config;
