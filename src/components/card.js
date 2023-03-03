import { popupOpenImage } from './modal.js'
import { openPopup } from './modal.js';
import { popupOpenImageBox } from './modal.js';
import { deleteCardFromServ, search } from './api.js';
import { putLike } from './api.js';
import { deleteLike } from './api.js';

const elTemplate = document.querySelector('#template').content;

export function createCard(el, likes, id) {

    const element = elTemplate.querySelector('.element').cloneNode(true);
    const elementImage = element.querySelector('.element__image');
    const elementCaption = element.querySelector('.element__caption');
    const elementTrash = element.querySelector('.element__trash');
    const elementLike = element.querySelector('.element__like');
    const elementLikeNumber = element.querySelector('.element__like-number');

    elementTrash.addEventListener('click', () => {
        deleteCardFromServ(id)
            .then(() => {
                element.remove()
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`)
            });
    })

    search()
        .then(userData => {
            if (el.owner._id !== userData._id) {
                elementTrash.style.display = 'none'
            } else {
                elementTrash.style.display = 'flex'
            }
            el.likes.forEach(arr => {
                if (arr._id === userData._id) {
                    elementLike.classList.add('element__like_status_active')
                }
            })
        })
        .catch(err => {
            console.error(`Ошибка: ${err}`)
        });



    elementLikeNumber.textContent = likes

    element.querySelector('.element__like').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('element__like_status_active')) {
            deleteLike(id)
                .then((data) => {
                    elementLike.classList.remove('element__like_status_active')
                    elementLikeNumber.textContent = data.likes.length
                })
                .catch(err => {
                    console.error(`Ошибка: ${err}`)
                });
        } else {
            putLike(id)
                .then((data) => {
                    elementLike.classList.add('element__like_status_active')
                    elementLikeNumber.textContent = data.likes.length
                })
                .catch(err => {
                    console.error(`Ошибка: ${err}`)
                });
        }
    })

    elementImage.src = el.link;
    elementCaption.textContent = el.name;
    elementImage.alt = el.textContent;

    elementImage.addEventListener('click', () => {
        handleImageClick(elementImage, elementCaption)
    });

    return element
}

const imageName = popupOpenImage.querySelector('.popup-image__caption');
const imageSrc = popupOpenImage.querySelector('.popup-image__image');

function handleImageClick(elementImage, elementCaption) {
    openPopup(popupOpenImageBox);
    imageSrc.src = elementImage.src;
    imageName.textContent = elementCaption.textContent;
    imageSrc.alt = imageName.textContent
}