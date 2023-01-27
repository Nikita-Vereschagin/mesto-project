

// обЪявление всех составляющих popupEditProfile

const popupEditProfileBox = document.querySelector('#popupEditProfileBox')
const popupEditProfile = popupEditProfileBox.querySelector('.popup__container');
const userName = popupEditProfile.querySelector('#nameInput');
const userDiscription = popupEditProfile.querySelector('#descriptionInput');
const popupEditProfileCloseIcon = popupEditProfile.querySelector('.popup__close-icon');
const popupEditProfileSubmit = popupEditProfile.querySelector('.popup__submit-button');
const popupEditProfileButton = document.querySelector('#buttonEditProfilePopup');
const userNameNow = document.querySelector('.profile__user-name');
const userDiscriptionNow = document.querySelector('.profile__user-description');

// обЪявление всех составляющих AddCardPopup

const popupAddCardBox = document.querySelector('#popupAddCardBox')
const popupAddCard = popupAddCardBox.querySelector('.popup__container');
const cardName = popupAddCard.querySelector('#nameInput');
const cardImage = popupAddCard.querySelector('#linkInput');
const popupAddCardCloseIcon = popupAddCard.querySelector('.popup__close-icon');
const popupAddCardSubmit = popupAddCard.querySelector('.popup__submit-button');
const popupAddCardButton = document.querySelector('#buttonAddCardPopup');

// объявление всех составляющих openImagePopup

const popupOpenImageBox = document.querySelector('#popupOpenImageBox')
const popupOpenImage = popupOpenImageBox.querySelector('.popup-image');
const imageName = popupOpenImage.querySelector('.popup-image__caption');
const imageSrc = popupOpenImage.querySelector('.popup-image__image');
const popupOpenImageCloseIcon = popupOpenImage.querySelector('.popup__close-icon');

// открытие попапа

function openPopup(popup) {;
  popup.classList.add('visibility');
}
popupEditProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfileBox);
  userName.value = userNameNow.textContent;
  userDiscription.value = userDiscriptionNow.textContent;
});

popupAddCardButton.addEventListener('click', () => { 
  openPopup(popupAddCardBox);
  popupAddCard.reset()
});

// закрытие попапа

function closePopup(popup) {
  popup.classList.remove('visibility');
}

popupEditProfileCloseIcon.addEventListener('click', () => { closePopup(popupEditProfileBox) });

popupAddCardCloseIcon.addEventListener('click', () => { closePopup(popupAddCardBox) });

popupOpenImageCloseIcon.addEventListener('click', () => { closePopup(popupOpenImageBox) });

// смена имени и описания

function editProfilePopup(evt) {
  evt.preventDefault();
  userNameNow.textContent = userName.value;
  userDiscriptionNow.textContent = userDiscription.value;
  closePopup(popupEditProfileBox);
}

popupEditProfile.addEventListener('submit', editProfilePopup)

//функционал карточки

newCard = {link: cardImage.value, name: cardName.value}

function createCard(el) {
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

 //добавление карточек из массива выше

const elTemplate = document.querySelector('#template').content;
const elContainer = document.querySelector('.elements__container');

initialCards.forEach(function(el) {
  createCard(el);
});

// Добавление карточек попапом

function addCard(evt) {
  evt.preventDefault();

  newCard = {link: cardImage.value, name: cardName.value}
  createCard(newCard)
  
  closePopup(popupAddCardBox);
}

popupAddCard.addEventListener('submit', addCard);