import {popupOpenImage} from './modal.js' 
import { openPopup } from './modal.js';
import { popupOpenImageBox } from './modal.js';
import { deleteCardFromServ } from './api.js';
import { addCardToServ } from './api.js';
import { putLike } from './api.js';
import { deleteLike } from './api.js';

const elTemplate = document.querySelector('#template').content;

export function createCard(el, isMyCard) {

    const element = elTemplate.querySelector('.element').cloneNode(true);
    const elementImage = element.querySelector('.element__image');
    const elementCaption = element.querySelector('.element__caption');

    elementImage.src = el.link;
    elementCaption.textContent = el.name;
    elementImage.alt = el.textContent;

    addCardToServ(elementCaption.textContent, elementImage.src)
    .then(res => {
        return res.json()
    })

    .then(data =>{
        if (isMyCard === true){
            element.querySelector('.element__trash').style.display = 'flex';
            element.querySelector('.element__trash').addEventListener('click', () => { 
                deleteCardFromServ(data._id)
                element.remove() 
            });
        }
        return data
    })
    .then(data =>{
        if(data.likes.length !== 0){
            element.querySelector('.element__like-number').textContent = data.likes.length
        }
        
        element.querySelector('.element__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like_status_active');
            if (evt.target.classList.contains('element__like_status_active')){
                putLike(data._id)
                .then(obj =>{
                    data.likes.length = obj.likes.length
                    if (obj.likes.length !== 0){
                        element.querySelector('.element__like-number').textContent = obj.likes.length
                    }else{
                        element.querySelector('.element__like-number').textContent = ''
                    }
                    obj.likes.length = data.likes.length
                })
            }else{
                deleteLike(data._id)
                .then(obj =>{
                    data.likes.length = obj.likes.length
                    if (obj.likes.length !== 0){
                        element.querySelector('.element__like-number').textContent = obj.likes.length
                    }else{
                        element.querySelector('.element__like-number').textContent = ''
                    }
                    obj.likes.length = data.likes.length
                })
            }
            
        });
    })

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