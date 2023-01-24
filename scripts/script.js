

// обЪявление всех составляющих editProfilePopup

const overlayEditProfilePopup = document.querySelector('#overlayEditProfilePopup');
const editProfilePopup = document.querySelector('#editProfilePopup');
const userName = editProfilePopup.querySelector('#firstInput');
const userDiscription = editProfilePopup.querySelector('#secondInput');
const closeIconEditProfilePopup = editProfilePopup.querySelector('.popup__close-icon');
const submitEditProfilePopup = editProfilePopup.querySelector('.popup__submit-button');
const buttonEditProfilePopup = document.querySelector('#buttonEditProfilePopup');
const userNameNow = document.querySelector('.profile__user-name');
const userDiscriptionNow = document.querySelector('.profile__user-description');

// обЪявление всех составляющих AddCardPopup

const overlayAddCardPopup = document.querySelector('#overlayAddCardPopup');
const addCardPopup = document.querySelector('#addCardPopup');
const cardName = addCardPopup.querySelector('#firstInput');
const cardImage = addCardPopup.querySelector('#secondInput');
const closeIconAddCardPopup = addCardPopup.querySelector('.popup__close-icon');
const submitAddCardPopup = addCardPopup.querySelector('.popup__submit-button');
const buttonAddCardPopup = document.querySelector('#buttonAddCardPopup');

// объявление всех составляющих openImagePopup

const overlayOpenImagePopup = document.querySelector('.popup-image__overlay');
const openImagePopup = document.querySelector('.popup-image');
const imageName = openImagePopup.querySelector('.popup-image__caption');
const imageSrc = openImagePopup.querySelector('.popup-image__image');
const closeIconOpenImagePopup = openImagePopup.querySelector('.popup__close-icon');

// открытие попапа

function openPopup(elementOne, elementTwo) {
  elementOne.classList.add('visibility');
  elementTwo.classList.add('visibility');
}

buttonEditProfilePopup.addEventListener('click', () => {
  openPopup(overlayEditProfilePopup, editProfilePopup)
  userName.value = userNameNow.textContent;
  userDiscription.value = userDiscriptionNow.textContent;
});

buttonAddCardPopup.addEventListener('click', () => { openPopup(overlayAddCardPopup, addCardPopup)});



// закрытие попапа

function closePopup(elementOne, elementTwo) {
  elementOne.classList.remove('visibility');
  elementTwo.classList.remove('visibility');
}

closeIconEditProfilePopup.addEventListener('click', () => { closePopup(overlayEditProfilePopup, editProfilePopup) });

closeIconAddCardPopup.addEventListener('click', () => { closePopup(overlayAddCardPopup, addCardPopup) });

closeIconOpenImagePopup.addEventListener('click', () => { closePopup(overlayOpenImagePopup, openImagePopup) });

// смена имени и описания

function handleEditProfilePopup(evt) {
  evt.preventDefault();
  userNameNow.textContent = userName.value;
  userDiscriptionNow.textContent = userDiscription.value;
  closePopup(overlayEditProfilePopup, editProfilePopup);
}

editProfilePopup.addEventListener('submit', handleEditProfilePopup)

// карточки

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: '21 когорта)',
    link: './images/pasha.jpg'
  },
  {
    name: '21 когорта)',
    link: './images/ded.jpg'
  },
  {
    name: '21 когорта)',
    link: './images/chelik.jpg'
  },
  {
    name: '21 когорта)',
    link: './images/fine.jpg'
  },
  {
    name: '21 когорта)',
    link: './images/zhaba.jpg'
  },
  {
    name: '21 когорта)',
    link: './images/problema.jpg'
  }
];

 //добавление карточек из массива выше

const elTemplate = document.querySelector('#template').content;
const elContainer = document.querySelector('.elements__container');

initialCards.forEach(function(el) {
  const element = elTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = el.link;
  element.querySelector('.element__caption').textContent = el.name;

  element.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_status_active');
  });

  element.querySelector('.element__trash').addEventListener('click', () => { element.remove() });

  element.querySelector('.element__image').addEventListener('click', () => { 
    openPopup(overlayOpenImagePopup, openImagePopup);
    imageSrc.src = element.querySelector('.element__image').src;
    imageName.textContent = element.querySelector('.element__caption').textContent; 
  });

  elContainer.prepend(element);
});

// Добавление карточек попапом

function handleAddCardPopup(evt) {
  evt.preventDefault();
  const element = elTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = cardImage.value;
  element.querySelector('.element__caption').textContent = cardName.value;

  element.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_status_active');
  });

  element.querySelector('.element__trash').addEventListener('click', () => { element.remove() });

  element.querySelector('.element__image').addEventListener('click', () => { 
    openPopup(overlayOpenImagePopup, openImagePopup);
    imageSrc.src = element.querySelector('.element__image').src;
    imageName.textContent = element.querySelector('.element__caption').textContent; 
  });

  elContainer.prepend(element);

  closePopup(overlayAddCardPopup, addCardPopup);
}

addCardPopup.addEventListener('submit', handleAddCardPopup);
