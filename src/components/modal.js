import { rendorCard } from './utils.js';
import {btnInactive} from './validate.js'
import { hideEror } from './validate.js';
import { enableValidation } from './validate.js';

// обЪявление всех составляющих popupEditProfile

const popupEditProfileBox = document.querySelector('#popupEditProfileBox')
const popupEditProfileOverlay = popupEditProfileBox.querySelector('.popup');
const popupEditProfile = popupEditProfileBox.querySelector('.popup__container');
const userName = popupEditProfile.querySelector('#nameInput');
const userDiscription = popupEditProfile.querySelector('#descriptionInput');
const popupEditProfileCloseIcon = popupEditProfile.querySelector('.popup__close-icon');
const popupEditProfileButton = document.querySelector('#buttonEditProfilePopup');
const userNameNow = document.querySelector('.profile__user-name');
const userDiscriptionNow = document.querySelector('.profile__user-description');

// обЪявление всех составляющих AddCardPopup

const popupAddCardBox = document.querySelector('#popupAddCardBox')
const popupAddCardOverlay = popupAddCardBox.querySelector('.popup');
const popupAddCard = popupAddCardBox.querySelector('.popup__container');
const cardName = popupAddCard.querySelector('#nameInput');
const cardImage = popupAddCard.querySelector('#linkInput');
const popupAddCardCloseIcon = popupAddCard.querySelector('.popup__close-icon');
const popupAddCardButton = document.querySelector('#buttonAddCardPopup');

// объявление всех составляющих openImagePopup

export const popupOpenImageBox = document.querySelector('#popupOpenImageBox');
const popupOpenImageOverlay = popupOpenImageBox.querySelector('.popup-image__overlay');
export const popupOpenImage = popupOpenImageBox.querySelector('.popup-image');
const popupOpenImageCloseIcon = popupOpenImage.querySelector('.popup__close-icon');

const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__edit-text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__edit-text_type_eror',
  errorClass: 'popup__edit-text_eror'
}

enableValidation(config)

// открытие попапа

export function openPopup(popup) {
    popup.classList.add('visibility')
    document.addEventListener('keydown', closeByEsc)    
  }


  popupEditProfileButton.addEventListener('click', () => {
    openForm(popupEditProfileBox,config)
    userName.value = userNameNow.textContent
    userDiscription.value = userDiscriptionNow.textContent
  });
  
  popupAddCardButton.addEventListener('click', () => { 
    openForm(popupAddCardBox,config)
    popupAddCard.reset()
  });
// на счет колбэков не очень понял. но всё ровно переделал фунцию, но не так, как вы хотели вроде бы.
  function openForm(popup,config) {
    const btn = popup.querySelector('.popup__submit-button')
    btnInactive(btn, config)
    const inputEl = popup.querySelector('.popup__edit-text')
    hideEror(popup, inputEl, config)
    openPopup(popup)
  }
  // закрытие попапа


  
  function closePopup(popup) {
    popup.classList.remove('visibility');
    document.removeEventListener('keydown', closeByEsc)
  }
  
  popupEditProfileCloseIcon.addEventListener('click', () => { closePopup(popupEditProfileBox) });
  popupEditProfileOverlay.addEventListener('click', () => { closePopup(popupEditProfileBox) });
  
  popupAddCardCloseIcon.addEventListener('click', () => { closePopup(popupAddCardBox) });
  popupAddCardOverlay.addEventListener('click', () => { closePopup(popupAddCardBox) });
  
  popupOpenImageCloseIcon.addEventListener('click', () => { closePopup(popupOpenImageBox) });
  popupOpenImageOverlay.addEventListener('click', () => { closePopup(popupOpenImageBox) });
  
  function closeByEsc(evt){
    if (evt.key === 'Escape'){
      const activePopup = document.querySelector('.popup-box.visibility')
      closePopup(activePopup)
    }
  }

  // смена имени и описания

function editProfilePopup(evt) {
    evt.preventDefault();
    userNameNow.textContent = userName.value;
    userDiscriptionNow.textContent = userDiscription.value;
    closePopup(popupEditProfileBox);
  }
  
  popupEditProfile.addEventListener('submit', editProfilePopup)

  // Добавление карточек попапом

function addCard(evt) {
    evt.preventDefault();
  
    const newCard = {link: cardImage.value, name: cardName.value}
    rendorCard(newCard)
    
    closePopup(popupAddCardBox);
  }
  
  popupAddCard.addEventListener('submit', addCard);

  // На счёт сборки проекта. Она работает, по крайней мере у меня.