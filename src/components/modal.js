import { renderCard } from './utils.js';
import { hideEror } from './validate.js';
import { addCardToServ, updateUserData } from './api.js';
import { updateAva } from './api.js';
import { handleSubmit } from './utils.js';
import { config } from '../index.js';

// обЪявление всех составляющих popupEditProfile

const popupEditProfile = document.querySelector('#popupEditProfile')
export const popupEditProfileContainer = popupEditProfile.querySelector('.popup__container');
const userName = popupEditProfileContainer.querySelector('#nameInput');
const userDiscription = popupEditProfileContainer.querySelector('#descriptionInput');
const popupEditProfileButton = document.querySelector('#buttonEditProfilePopup');
export const userNameNow = document.querySelector('.profile__user-name');
export const userDiscriptionNow = document.querySelector('.profile__user-description');
export const popupEditProfileSubBtn = popupEditProfileContainer.querySelector('.popup__submit-button')

// обЪявление всех составляющих AddCardPopup

const popupAddCard = document.querySelector('#popupAddCard')
export const popupAddCardContainer = popupAddCard.querySelector('.popup__container');
const cardName = popupAddCardContainer.querySelector('#nameInput');
const cardImage = popupAddCardContainer.querySelector('#linkInput');
const popupAddCardButton = document.querySelector('#buttonAddCardPopup');
export const popupAddCardSubBtn = popupAddCardContainer.querySelector('.popup__submit-button')

// объявление всех составляющих openImagePopup

export const popupOpenImageBox = document.querySelector('#popupOpenImage');
export const popupOpenImage = popupOpenImageBox.querySelector('.popup-image');

const popupEditAvatar = document.querySelector('#popupEditAvatar')
export const popupEditAvatarContainer = popupEditAvatar.querySelector('.popup__container');
const avaUrl = popupEditAvatarContainer.querySelector('#avaInput');
const popupEditAvatarButton = document.querySelector('#popupEditAvatarButton');
export const ava = document.querySelector('.profile__avatar-image');
export const popupEditAvatarSubBtn = popupEditAvatarContainer.querySelector('.popup__submit-button')



// открытие попапа

export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEsc)
}

popupEditProfileButton.addEventListener('click', openPopupEditProfile);

function openPopupEditProfile() {
  openForm(popupEditProfile)
  userName.value = userNameNow.textContent
  userDiscription.value = userDiscriptionNow.textContent
}

popupAddCardButton.addEventListener('click', () => {
  openForm(popupAddCard)
  popupAddCardContainer.reset()
});

function openForm(popup) {
  const inputList = popup.querySelectorAll('.popup__edit-text')
  inputList.forEach(inputEl => {
    hideEror(popup, inputEl, config)
  });
  openPopup(popup)
}

popupEditAvatarButton.addEventListener('click', () => {
  openForm(popupEditAvatar, config)
  popupEditAvatarContainer.reset()
});
// закрытие попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc)
}

const popups = document.querySelectorAll('.popup')//я даже не задумывался об этом, спасибо вам большое

popups.forEach((popup) => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__overlay')) {
      closePopup(popup)
    }
  })
})

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup.popup_opened')
    closePopup(activePopup)
  }
}


// Добавление карточек попапом

export function addCard(evt) {
  const newCard = { link: cardImage.value, name: cardName.value }
  function makeRequest() {
    return addCardToServ(newCard.name, newCard.link)
      .then(cardData => {
        renderCard(cardData, cardData.likes.length, cardData._id)
        closePopup(popupAddCard);
      })
  }
  handleSubmit(makeRequest, evt)
}

// смена имени и описания


export function editProfilePopup(evt) {
  function makeRequest() {
    return updateUserData(userName.value, userDiscription.value, ava.src)
      .then(() => {
        userNameNow.textContent = userName.value;
        userDiscriptionNow.textContent = userDiscription.value;
        closePopup(popupEditProfile);
      })
  }
  handleSubmit(makeRequest, evt)
}

// Смена аватара 

export function editAva(evt) {
  function makeRequest() {
    return updateAva(avaUrl.value)
      .then(() => {
        ava.src = avaUrl.value;
        closePopup(popupEditAvatar);
      })
  }
  handleSubmit(makeRequest, evt)
}

