import {initialCards} from './constants.js';
import { rendorCard } from './utils.js';
 //добавление карточек из массива

 initialCards.forEach(function(el) {
  rendorCard(el);
 });