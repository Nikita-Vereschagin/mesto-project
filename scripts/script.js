

// обЪявление всех составляющих popupEditProfile

const popupEditProfileOverlay = document.querySelector('#overlayEditProfilePopup');
const popupEditProfile = document.querySelector('#editProfilePopup');
const userName = popupEditProfile.querySelector('#firstInput');
const userDiscription = popupEditProfile.querySelector('#secondInput');
const popupEditProfileCloseIcon = popupEditProfile.querySelector('.popup__close-icon');
const popupEditProfileSubmit = popupEditProfile.querySelector('.popup__submit-button');
const popupEditProfileButton = document.querySelector('#buttonEditProfilePopup');
const userNameNow = document.querySelector('.profile__user-name');
const userDiscriptionNow = document.querySelector('.profile__user-description');

// обЪявление всех составляющих AddCardPopup

const popupAddCardOverlay = document.querySelector('#overlayAddCardPopup');
const popupAddCard = document.querySelector('#addCardPopup');
const cardName = popupAddCard.querySelector('#firstInput');
const cardImage = popupAddCard.querySelector('#secondInput');
const popupAddCardCloseIcon = popupAddCard.querySelector('.popup__close-icon');
const popupAddCardSubmit = popupAddCard.querySelector('.popup__submit-button');
const popupAddCardButton = document.querySelector('#buttonAddCardPopup');

// объявление всех составляющих openImagePopup

const popupOpenImageOverlay = document.querySelector('.popup-image__overlay');
const popupOpenImage = document.querySelector('.popup-image');
const imageName = popupOpenImage.querySelector('.popup-image__caption');
const imageSrc = popupOpenImage.querySelector('.popup-image__image');
const popupOpenImageCloseIcon = popupOpenImage.querySelector('.popup__close-icon');

// открытие попапа

function openPopup(popupOverlay, popup) {
  popupOverlay.classList.add('visibility');
  popup.classList.add('visibility');
}
popupEditProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfileOverlay, popupEditProfile);
  userName.value = userNameNow.textContent;
  userDiscription.value = userDiscriptionNow.textContent;
});

popupAddCardButton.addEventListener('click', () => { 
  openPopup(popupAddCardOverlay, popupAddCard);
  cardImage.value = ''
  cardName.value = ''
});

// закрытие попапа

function closePopup(elementOne, elementTwo) {
  elementOne.classList.remove('visibility');
  elementTwo.classList.remove('visibility');
}

popupEditProfileCloseIcon.addEventListener('click', () => { closePopup(popupEditProfileOverlay, popupEditProfile) });

popupAddCardCloseIcon.addEventListener('click', () => { closePopup(popupAddCardOverlay, popupAddCard) });

popupOpenImageCloseIcon.addEventListener('click', () => { closePopup(popupOpenImageOverlay, popupOpenImage) });

// смена имени и описания

function editProfilePopup(evt) {
  evt.preventDefault();
  userNameNow.textContent = userName.value;
  userDiscriptionNow.textContent = userDiscription.value;
  closePopup(popupEditProfileOverlay, popupEditProfile);
}

popupEditProfile.addEventListener('submit', editProfilePopup)

//функционал карточки

function createCard(card) {
  card.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_status_active');
  });

  card.querySelector('.element__trash').addEventListener('click', () => { card.remove() });

  card.querySelector('.element__image').addEventListener('click', () => { 
    openPopup(popupOpenImageOverlay, popupOpenImage);
    imageSrc.src = card.querySelector('.element__image').src;
    imageName.textContent = card.querySelector('.element__caption').textContent; 
    
  });
  
}

 //добавление карточек из массива выше

const elTemplate = document.querySelector('#template').content;
const elContainer = document.querySelector('.elements__container');

initialCards.forEach(function(el) {
  const element = elTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = el.link;
  element.querySelector('.element__caption').textContent = el.name;

  createCard(element);

  elContainer.prepend(element);
});

// Добавление карточек попапом

function addCard(evt) {
  evt.preventDefault();
  const element = elTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = cardImage.value;
  element.querySelector('.element__caption').textContent = cardName.value;

  createCard(element);

  closePopup(popupAddCardOverlay, popupAddCard);

  elContainer.prepend(element);
}

addCardPopup.addEventListener('submit', addCard);

// Хотел бы поинтересоваться, по 6 пункту. Что не так с openPopup и closePopup? Эти функции универсальны, я не согласен с вами. У них общий для всех попапов функционал. Как аргументы они принимают фон попапа и сам попап. Я не думаю, что это ошибка.
// На счёт alt. Он есть, присмотритесь. Согласен, что изначально он был белым по белому написан, но только у картинки в карточки. А так он присутствует, вроде, везде.