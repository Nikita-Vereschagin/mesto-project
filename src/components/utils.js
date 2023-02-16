import {popupOpenImage} from './modal.js' 
const imageName = popupOpenImage.querySelector('.popup-image__caption');
const imageSrc = popupOpenImage.querySelector('.popup-image__image');

const elTemplate = document.querySelector('#template').content;
const elContainer = document.querySelector('.elements__container');
export function createCard(el) {
    const element = elTemplate.querySelector('.element').cloneNode(true);
    const elementImage = element.querySelector('.element__image');
    const elementCaption = element.querySelector('.element__caption');
  
    elementImage.src = el.link;
    elementCaption.textContent = el.name;
    elementImage.alt = el.textContent;
  
    element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_status_active');
    });
  
    element.querySelector('.element__trash').addEventListener('click', () => { element.remove() });
  
    element.querySelector('.element__image').addEventListener('click', () => { 
      openPopup(popupOpenImageBox);
      imageSrc.src = element.querySelector('.element__image').src;
      imageName.textContent = element.querySelector('.element__caption').textContent; 
      imageSrc.alt = imageName.textContent
    });
    
    elContainer.prepend(element);
  }