import {popupOpenImage} from './modal.js' 
import { openPopup } from './modal.js';
import { popupOpenImageBox } from './modal.js';
import { deleteCardFromServ } from './api.js';
import { putLike } from './api.js';
import { deleteLike } from './api.js';
import { getCardData } from './api.js';
import { rendorCard } from './utils.js';

getCardData()
.then(data=>{
  data.forEach(el => {
    rendorCard(el, el.likes.length, el._id)
    if (el.owner._id !== "bb12d784f20a16c7281b0c6e"){
        document.querySelector('.element__trash').style.display = 'none'
    }else{
        document.querySelector('.element__trash').style.display = 'flex'
    }
    el.likes.forEach(arr =>{
        if (arr._id === 'bb12d784f20a16c7281b0c6e'){
            document.querySelector('.element__like').classList.add('element__like_status_active')
        }
    })
  });
})

const elTemplate = document.querySelector('#template').content;

export function createCard(el, likes, id) {

    const element = elTemplate.querySelector('.element').cloneNode(true);
    const elementImage = element.querySelector('.element__image');
    const elementCaption = element.querySelector('.element__caption');

    element.querySelector('.element__trash').addEventListener('click', () => { 
        deleteCardFromServ(id)
        .then(()=>{
            element.remove()
        })  
    })

    element.querySelector('.element__like-number').textContent = likes

    element.querySelector('.element__like').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('element__like_status_active')){
            deleteLike(id)
            .then((data)=>{
                element.querySelector('.element__like').classList.remove('element__like_status_active')
                element.querySelector('.element__like-number').textContent = data.likes.length
            })     
        }else{
            putLike(id)
            .then((data)=>{
                element.querySelector('.element__like').classList.add('element__like_status_active')
                element.querySelector('.element__like-number').textContent = data.likes.length
            })          
        }
    })

    elementImage.src = el.link;
    elementCaption.textContent = el.name;
    elementImage.alt = el.textContent;

    elementImage.addEventListener('click', () => { 
        clickOnEl(elementImage, elementCaption)
    });

    return element
}

const imageName = popupOpenImage.querySelector('.popup-image__caption');
const imageSrc = popupOpenImage.querySelector('.popup-image__image');

function clickOnEl(elementImage, elementCaption){
    openPopup(popupOpenImageBox);
    imageSrc.src = elementImage.src;
    imageName.textContent = elementCaption.textContent; 
    imageSrc.alt = imageName.textContent
}