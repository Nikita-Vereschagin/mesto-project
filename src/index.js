import './pages/index.css';
import './components/validate.js';
import './components/card.js';
import './components/modal.js';
import './components/utils.js';
import './components/api.js';

import { enableValidation } from './components/validate.js';

enableValidation ({
    formSelector: '.popup__container',
    inputSelector: '.popup__edit-text',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__edit-text_type_eror',
    errorClass: 'popup__edit-text_eror'
  })

import { addCard } from './components/modal.js';
import { editProfilePopup } from './components/modal.js';
import { editAva } from './components/modal.js';

import { popupAddCardContainer } from './components/modal.js';
import { popupEditAvatarContainer } from './components/modal.js';
import { popupEditProfileContainer } from './components/modal.js';

popupAddCardContainer.addEventListener('submit', (evt) =>{
  addCard(evt)
});

popupEditProfileContainer.addEventListener('submit', (evt) =>{
  editProfilePopup(evt)    
})

popupEditAvatarContainer.addEventListener('submit', (evt) => {
  editAva(evt)   
});

import { getCardData } from './components/api.js';
import { renderCard } from './components/utils.js';
import { search } from './components/api.js';

import { ava } from './components/modal.js';
import { userDiscriptionNow } from './components/modal.js';
import { userNameNow } from './components/modal.js';

Promise.all([search(), getCardData()])
    .then(([userData, cards]) => {
        userNameNow.textContent = userData.name;
        userDiscriptionNow.textContent = userData.about;
        ava.src = userData.avatar;
        cards.forEach(el => {
          renderCard(el, el.likes.length, el._id)
        })
    })
    .catch(err => {
      console.error(`Ошибка: ${err}`)
    });