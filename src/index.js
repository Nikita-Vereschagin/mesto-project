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
  