// карточки

const pasha = new URL('../images/pasha.jpg', import.meta.url);
const ded = new URL('../images/ded.jpg', import.meta.url);
const chelik = new URL('../images/chelik.jpg', import.meta.url);

const fine = new URL('../images/fine.jpg', import.meta.url);
const zhaba = new URL('../images/zhaba.jpg', import.meta.url);
const problema = new URL('../images/problema.jpg', import.meta.url);



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
      link: pasha
    },
    {
      name: '21 когорта)',
      link: ded
    },
    {
      name: '21 когорта)',
      link: chelik
    },
    {
      name: '21 когорта)',
      link: fine
    },
    {
      name: '21 когорта)',
      link: zhaba
    },
    {
      name: '21 когорта)',
      link: problema
    }
  ];
export {initialCards}