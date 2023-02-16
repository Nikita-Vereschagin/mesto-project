import { createCard } from './utils.js';

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

const popupOpenImageBox = document.querySelector('#popupOpenImageBox');
const popupOpenImageOverlay = popupOpenImageBox.querySelector('.popup-image__overlay');
export const popupOpenImage = popupOpenImageBox.querySelector('.popup-image');
const popupOpenImageCloseIcon = popupOpenImage.querySelector('.popup__close-icon');

// открытие попапа

function openPopup(popup) {;
    popup.classList.add('visibility');
  }
  popupEditProfileButton.addEventListener('click', () => {
    openPopup(popupEditProfileBox);
    userName.value = userNameNow.textContent;
    userDiscription.value = userDiscriptionNow.textContent;
  });
  
  popupAddCardButton.addEventListener('click', () => { 
    openPopup(popupAddCardBox);
    popupAddCard.reset()
  });
  
  // закрытие попапа
  
  function closePopup(popup) {
    popup.classList.remove('visibility');
  }
  
  popupEditProfileCloseIcon.addEventListener('click', () => { closePopup(popupEditProfileBox) });
  popupEditProfileOverlay.addEventListener('click', () => { closePopup(popupEditProfileBox) });
  
  popupAddCardCloseIcon.addEventListener('click', () => { closePopup(popupAddCardBox) });
  popupAddCardOverlay.addEventListener('click', () => { closePopup(popupAddCardBox) });
  
  popupOpenImageCloseIcon.addEventListener('click', () => { closePopup(popupOpenImageBox) });
  popupOpenImageOverlay.addEventListener('click', () => { closePopup(popupOpenImageBox) });
  
  document.addEventListener('keydown', (evt) =>{
    if (evt.key === 'Escape'){
      closePopup(popupEditProfileBox)
      closePopup(popupOpenImageBox)
      closePopup(popupAddCardBox)
    }
  })

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
    createCard(newCard)
    
    closePopup(popupAddCardBox);
  }
  
  popupAddCard.addEventListener('submit', addCard);