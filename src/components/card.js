import {initialCards} from './constants.js';
import { createCard } from './utils.js';
 //добавление карточек из массива

 initialCards.forEach(function(el) {
   createCard(el);
 });