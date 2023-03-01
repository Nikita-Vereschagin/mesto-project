import { checkError } from "./utils"
import { checkResponse } from "./utils"

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: '8216fc24-a13e-4411-bcc5-fbbc352c50c0',
    'Content-Type': 'application/json'
  }
}


function request(endpoint, options) {
  return fetch(config.baseUrl + endpoint, options).then(checkResponse).catch(checkError)
}

export function search(){
  return request('/users/me', {
    headers: config.headers
  })
}

export function getCardData(){
 return request('/cards', {headers: config.headers})
}

export function updateUserData(nameDate, aboutData, avaData){
    return request('/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: nameDate,
        about: aboutData,
        avatar: avaData
      })
  })
}

export function addCardToServ(nameDate, linkData){
    return request('/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: nameDate,
        link: linkData,
      })
    })
}

export function putLike(id){
  return request(`/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
}

export function deleteLike(id){
  return request(`/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export function deleteCardFromServ(id){
  return request(`/cards/${id}`,{ 
    method: 'DELETE',
    headers: config.headers
  })
}

// Здравствуйте, не могу понять, почему у меня не работает обновление аватарки. И ещё, если вы примите мою работу, то можете, пожалуйста, её не подтверждать. Если я успею, я хотел бы сделать попап подтвержения удаления.