export function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach(function (formEl){
    formEl.addEventListener('submit', evt => {
      evt.preventDefault()
    })
    setEventListener(formEl, config)
  })
}

export function setEventListener(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector))
  const btn = formEl.querySelector(config.submitButtonSelector)
  toggleButtonState(inputList, btn, config)
  formEl.addEventListener('reset', () =>{ 
    setTimeout(() => {
      toggleButtonState(inputList, btn, config)
    }, 0);
  })

  inputList.forEach(inputEl => {
    inputEl.addEventListener('input', () => {
      checkValidity(formEl, inputEl, config)
      toggleButtonState(inputList, btn, config)
    })
  })
}

export function checkValidity(formEl, inputEl, config) {
  if (inputEl.validity.patternMismatch) {
    inputEl.setCustomValidity(inputEl.dataset.errorMessage);
  } else {
    inputEl.setCustomValidity("");
  }
  if (!(inputEl.validity.valid)) {
    showEror(formEl, inputEl, inputEl.validationMessage, config)
  }else{
    hideEror(formEl, inputEl, config)
  }
}

function showEror(formEl, inputEl, erorMsg, config) {
  const erorEl = formEl.querySelector(`.${inputEl.id}-eror`)
  inputEl.classList.add(config.inputErrorClass) 
  erorEl.textContent = erorMsg;
  erorEl.classList.add(config.errorClass)
}

export function hideEror(formEl, inputEl, config) {
  const erorEl = formEl.querySelector(`.${inputEl.id}-eror`)
  inputEl.classList.remove(config.inputErrorClass)
  erorEl.classList.remove(config.errorClass)
  erorEl.textContent = ''
}

function hasInvalidInput(inputList) {
  return inputList.some(inputEl => {
    return !inputEl.validity.valid
  })
}

function toggleButtonState(inputList, btn, config) {
  if (hasInvalidInput(inputList)){
    btnInactive(btn, config)
  }else {
    btnActive(btn, config)
  }
}

function btnActive(btn, config){
  btn.classList.remove(config.inactiveButtonClass)
  btn.disabled = false
}

export function btnInactive(btn, config){
  btn.classList.add(config.inactiveButtonClass)
  btn.disabled = true
}