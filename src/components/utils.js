import { createCard } from './card.js';
import { popupAddCardSubBtn } from './modal.js';

const elContainer = document.querySelector('.elements__container');

export function rendorCard(el, likes, id) {
  return elContainer.prepend(createCard(el, likes, id))
}


export function checkResponse(res){
  if(res.ok){return res.json()}
  return Promise.reject(res.status)
}
export function checkError(err){
  console.log(`Ошибка: ${err}`)
}

export function rendorLoading(isLoading, btn){
  if (isLoading){
    btn.textContent = 'Сохранение...'
  }else if(btn === popupAddCardSubBtn){
    btn.textContent = 'Создать'
  }else{
    btn.textContent = 'Сохранить'
  }
}