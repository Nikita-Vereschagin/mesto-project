import { createCard } from './card.js';

const elContainer = document.querySelector('.elements__container');

export function rendorCard(el, isMyCard) {
  return elContainer.prepend(createCard(el, isMyCard))
}