export function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach(function (formEl){
    formEl.addEventListener('submit', evt => {
      evt.preventDefault()
    })
  })
  formList.forEach(field => {
    addEventListener(field, config);
  });
}

function addEventListener(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector))
  const btn = formEl.querySelector(config.submitButtonSelector)
  btnStatus(inputList, btn, config)
  inputList.forEach(inputEl => {
    inputEl.addEventListener('input', () => {
      checkValidity(formEl, inputEl, config)
      btnStatus(inputList, btn, config)
    })
  })
}

function checkValidity(formEl, inputEl, config) {
  if (inputEl.validity.patternMismatch) {
    inputEl.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
  } else {
    inputEl.setCustomValidity("");
  }
  if (!(inputEl.validity.valid)) {
    showEror(formEl, inputEl, inputEl.validationMessage, config)
  }else {
    hideEror(formEl, inputEl, config)
  }
}

function showEror(formEl, inputEl, erorMsg, config) {
  const erorEl = formEl.querySelector(`.${inputEl.id}-eror`)
  inputEl.classList.add(config.inputErrorClass) 
  erorEl.textContent = erorMsg;
  erorEl.classList.add(config.errorClass)
}

function hideEror(formEl, inputEl, config) {
  const erorEl = formEl.querySelector(`.${inputEl.id}-eror`)
  inputEl.classList.remove(config.inputErrorClass)
  erorEl.classList.remove(config.errorClass)
  erorEl.textContent = ''
}

function btnStatus(inputList, btn, config) {
  if (hasInvalidInput(inputList)){
    btn.classList.add(config.inactiveButtonClass)
    btn.disabled = true;
  }else {
    btn.classList.remove(config.inactiveButtonClass)
    btn.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function(inputEl) {
    return !inputEl.validity.valid
  })
}