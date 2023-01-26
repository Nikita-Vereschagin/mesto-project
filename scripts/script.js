

// обЪявление всех составляющих popupEditProfile

const popupEditProfileBox = document.querySelector('#popupEditProfileBox')
const popupEditProfile = popupEditProfileBox.querySelector('.popup__container');
const userName = popupEditProfile.querySelector('#nameInput');
const userDiscription = popupEditProfile.querySelector('#selectorInput');
const popupEditProfileCloseIcon = popupEditProfile.querySelector('.popup__close-icon');
const popupEditProfileSubmit = popupEditProfile.querySelector('.popup__submit-button');
const popupEditProfileButton = document.querySelector('#buttonEditProfilePopup');
const userNameNow = document.querySelector('.profile__user-name');
const userDiscriptionNow = document.querySelector('.profile__user-description');

// обЪявление всех составляющих AddCardPopup

const popupAddCardBox = document.querySelector('#popupAddCardBox')
const popupAddCard = popupAddCardBox.querySelector('.popup__container');
const cardName = popupAddCard.querySelector('#nameInput');
const cardImage = popupAddCard.querySelector('#selectorInput');
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

function createCard(card) {
  card.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_status_active');
  });

  card.querySelector('.element__trash').addEventListener('click', () => { card.remove() });

  card.querySelector('.element__image').addEventListener('click', () => { 
    openPopup(popupOpenImageBox);
    imageSrc.src = card.querySelector('.element__image').src;
    imageName.textContent = card.querySelector('.element__caption').textContent; 
    imageSrc.alt = imageName.textContent
  });
  
}

 //добавление карточек из массива выше

const elTemplate = document.querySelector('#template').content;
const elContainer = document.querySelector('.elements__container');

initialCards.forEach(function(el) {
  const element = elTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = el.link;
  element.querySelector('.element__caption').textContent = el.name;
  element.querySelector('.element__image').alt = el.name;

  createCard(element);

  elContainer.prepend(element);
});

// Добавление карточек попапом

function addCard(evt) {
  evt.preventDefault();
  const element = elTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = cardImage.value;
  element.querySelector('.element__caption').textContent = cardName.value;
  element.querySelector('.element__image').alt = cardName.value;

  createCard(element);

  closePopup(popupAddCardBox);

  elContainer.prepend(element);
}

popupAddCard.addEventListener('submit', addCard);
// Обсолютно не понимаю, как сделать так, чтобы строчки 97-98 и 111-112 работали вместе. Они разные, но выполняют одну фукцию. Я попробовал, работает лишь добавление карточек. А вот про карточки из массива, он просто создает 12 пустых карточек.
