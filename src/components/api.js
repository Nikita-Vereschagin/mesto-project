import { rendorCard } from './utils.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: '8216fc24-a13e-4411-bcc5-fbbc352c50c0',
    'Content-Type': 'application/json'
  }
}

export function search(){
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: '8216fc24-a13e-4411-bcc5-fbbc352c50c0'
    }
  })
}

export function getCardData(){
 return fetch(`${config.baseUrl}/cards`, {
    headers: {authorization: '8216fc24-a13e-4411-bcc5-fbbc352c50c0'}
  })
  .then(res=>{
    if (res.ok){
      return res.json()
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .catch((err)=>{console.log(err)})
}

getCardData()
  .then(data=>{
    data.forEach(el => {
      rendorCard(el, false)
    });
  })

export function updateUserData(nameDate, aboutData){
    return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: nameDate.textContent,
        about: aboutData.textContent
      })
  })
}

export function addCardToServ(nameDate, linkData){
    return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: nameDate,
        link: linkData
      })
    })
}

export function putLike(id){
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res =>{return res.json()})
}

export function deleteLike(id){
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res =>{return res.json()})
}

export function deleteCardFromServ(id){
  return fetch(`${config.baseUrl}/cards/${id}`,{ 
    method: 'DELETE',
    headers: config.headers
  })
}