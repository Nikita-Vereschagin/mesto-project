import { createCard } from './card.js';

const elContainer = document.querySelector('.elements__container');

export function renderCard(el, likes, id) {
  return elContainer.prepend(createCard(el, likes, id))
}


export function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res.status)
}
export function renderLoading(isLoading, btn, btnText, loadingText) {
  if (isLoading) {
    btn.textContent = loadingText
  } else {
    btn.textContent = btnText
  }
}

export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const subBtn = evt.submitter;
  const initialText = subBtn.textContent;
  renderLoading(true, subBtn, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch(err => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, subBtn, initialText);
    });
}
