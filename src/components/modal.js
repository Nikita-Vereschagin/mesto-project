import { rendorCard } from './utils.js';
import { btnInactive } from './validate.js'
import { hideEror } from './validate.js';
import { enableValidation } from './validate.js';
import { addCardToServ, updateUserData } from './api.js';

import { search } from './api.js';
import { rendorLoading } from './utils.js';

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
const popupEditProfileSubBtn = popupEditProfile.querySelector('.popup__submit-button')

// обЪявление всех составляющих AddCardPopup

const popupAddCardBox = document.querySelector('#popupAddCardBox')
const popupAddCardOverlay = popupAddCardBox.querySelector('.popup');
const popupAddCard = popupAddCardBox.querySelector('.popup__container');
const cardName = popupAddCard.querySelector('#nameInput');
const cardImage = popupAddCard.querySelector('#linkInput');
const popupAddCardCloseIcon = popupAddCard.querySelector('.popup__close-icon');
const popupAddCardButton = document.querySelector('#buttonAddCardPopup');
export const popupAddCardSubBtn = popupAddCard.querySelector('.popup__submit-button')

// объявление всех составляющих openImagePopup

export const popupOpenImageBox = document.querySelector('#popupOpenImageBox');
const popupOpenImageOverlay = popupOpenImageBox.querySelector('.popup-image__overlay');
export const popupOpenImage = popupOpenImageBox.querySelector('.popup-image');
const popupOpenImageCloseIcon = popupOpenImage.querySelector('.popup__close-icon');

const popupEditAvatarBox = document.querySelector('#popupEditAvatarBox')
const popupEditAvatarOverlay = popupEditAvatarBox.querySelector('.popup');
const popupEditAvatar = popupEditAvatarBox.querySelector('.popup__container');
const avaUrl = popupEditAvatar.querySelector('#avaInput');
const popupEditAvatarCloseIcon = popupEditAvatar.querySelector('.popup__close-icon');
const popupEditAvatarButton = document.querySelector('#popupEditAvatarButton');
const ava = document.querySelector('.profile__avatar-image');
const popupEditAvatarSubBtn = popupEditAvatar.querySelector('.popup__submit-button')

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

  popupEditProfileButton.addEventListener('click', openPopupEditProfile);
  
  function openPopupEditProfile () {
    openForm(popupEditProfileBox,config)
    userName.value = userNameNow.textContent
    userDiscription.value = userDiscriptionNow.textContent
  }

  popupAddCardButton.addEventListener('click', () => { 
    openForm(popupAddCardBox,config)
    popupAddCard.reset()
  });

  function openForm(popup,config) {
    const btn = popup.querySelector('.popup__submit-button')
    btnInactive(btn, config)
    const inputEl = popup.querySelector('.popup__edit-text')
    hideEror(popup, inputEl, config)
    openPopup(popup)
  }

  popupEditAvatarButton.addEventListener('click',() => { 
    openForm(popupEditAvatarBox,config)
    popupEditAvatar.reset()
  });
  // закрытие попапа
  
  function closePopup(popup) {
    popup.classList.remove('visibility');
    document.removeEventListener('keydown', closeByEsc)
  }
  
  popupEditProfileCloseIcon.addEventListener('click', () => { closePopup(popupEditProfileBox) });
  popupEditProfileOverlay.addEventListener('click', () => { closePopup(popupEditProfileBox) });
  
  popupAddCardCloseIcon.addEventListener('click', () => { closePopup(popupAddCardBox) });
  popupAddCardOverlay.addEventListener('click', () => { closePopup(popupAddCardBox) });
  
  popupEditAvatarCloseIcon.addEventListener('click', () => { closePopup(popupEditAvatarBox) });
  popupEditAvatarOverlay.addEventListener('click', () => { closePopup(popupEditAvatarBox) });
  
  popupOpenImageCloseIcon.addEventListener('click', () => { closePopup(popupOpenImageBox) });
  popupOpenImageOverlay.addEventListener('click', () => { closePopup(popupOpenImageBox) });
  
  function closeByEsc(evt){
    if (evt.key === 'Escape'){
      const activePopup = document.querySelector('.popup-box.visibility')
      closePopup(activePopup)
    }
  }

  
  // Добавление карточек попапом

function addCard(evt) {
    evt.preventDefault();
    const newCard = {link: cardImage.value, name: cardName.value}
    addCardToServ(newCard.name, newCard.link)
    .then((result)=>{
      rendorCard(newCard, result.likes.length, result._id)
      closePopup(popupAddCardBox);
    })
    .finally(()=>{rendorLoading(false, popupAddCardSubBtn)})
  }
  
  popupAddCard.addEventListener('submit', (evt) =>{
    rendorLoading(true, popupAddCardSubBtn)
    addCard(evt)
    
  });

// смена имени и описания


function editProfilePopup(evt) {
    evt.preventDefault();
    updateUserData(userName.value, userDiscription.value, ava.src)
    .then((data) =>{
      userNameNow.textContent = userName.value;
      userDiscriptionNow.textContent = userDiscription.value;
      closePopup(popupEditProfileBox);
      return data
    }) 
    .finally(()=>{rendorLoading(false, popupEditProfileSubBtn)})   
  }

  popupEditProfile.addEventListener('submit', (evt) =>{
    rendorLoading(true, popupEditProfileSubBtn)
    editProfilePopup(evt)    
  })

// Смена аватара 

  function editAva(evt) {
    evt.preventDefault();
    updateUserData(userNameNow.textContent, userDiscriptionNow.textContent, avaUrl.value)
    .then((data) => {
      ava.src = avaUrl.value;
      closePopup(popupEditAvatarBox);
      console.log(data)
    })
    .finally(()=>{rendorLoading(false, popupEditAvatarSubBtn)})
  }
  
  popupEditAvatar.addEventListener('submit', (evt) => {
    rendorLoading(true, popupEditAvatarSubBtn)
    editAva(evt)   
  });

  search()
  .then(data =>{
    userNameNow.textContent = data.name;
    userDiscriptionNow.textContent = data.about;
    ava.src = data.avatar;
    return data
  })