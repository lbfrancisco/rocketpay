import IMask from "imask"

import "./css/index.css"

const ccBgFirstColor = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgSecondColor = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccCardLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: [
      "#2D57F2",
      "#436D99"
    ],
    mastercard: [
      "#DF6F29",
      "#C69347"
    ],
    elo: [
      "#FF87C0",
      "#00AEEF"
    ],
    amex: [],
    discover: [],
    default: [
      "black",
      "gray"
    ]
  }

  ccBgFirstColor.setAttribute("fill", colors[type][0])
  ccBgSecondColor.setAttribute("fill", colors[type][1])
  ccCardLogo.setAttribute("src", `cc-${type}.svg`)
}

// Card Number Mask
const cardNumberInput = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{5}/,
      cardType: 'visa',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: 'mastercard',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9))|(509([0-9][0-9][0-9])))/,
      cardType: 'elo',
    },
    {
      mask: '0000 0000 0000 0000',
      cardType: 'default'
    }
  ], 
  
  dispatch: function(appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '')
    const foundMask = dynamicMasked.compiledMasks.find(function(item) {
      return number.match(item.regex)
    })
    return foundMask
  }
}

const cardNumberMask = IMask(cardNumberInput, cardNumberPattern)
cardNumberMask.on("accept", () => {
  updateCardNumber(cardNumberMask.value)
  setCardType(cardNumberMask.masked.currentMask.cardType)
})

function updateCardNumber(cardNumber) {
  const ccCardNumber = document.querySelector(".cc-number")
  ccCardNumber.innerText = cardNumber.length === 0 ? "1234 5678 9012 3456" : cardNumber
}


// Card HolderName Mask
const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolderValue = document.querySelector(".cc-holder .value")
  ccHolderValue.innerText =  cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value.replace("/^[a-zA-Z]*$/", "aaaaaaaaaaaaa")
})

// Expiration Date Mask
const expirationDateInput = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    }
  }
}

const expirationDateMask = IMask(expirationDateInput, expirationDatePattern)
expirationDateMask.on("accept", () => {
  updateExpirationDate(expirationDateMask.value)
})

function updateExpirationDate(date) {
  const ccExpirationDate = document.querySelector(".cc-expiration .value")
  ccExpirationDate.innerText = date.length === 0 ? "12/32" : date
}

// Security Code Mask
const securityCodeInput = document.querySelector("#security-code")
const securityCodePattern = {
  mask: '0000',
}

const securityCodeMask = IMask(securityCodeInput, securityCodePattern)
securityCodeMask.on("accept", () => {
  updateSecurityCode(securityCodeMask.value)
})

function updateSecurityCode(code) {
  const ccSecurityCode = document.querySelector(".cc-security .value")
  ccSecurityCode.innerText = code.length === 0 ? "123" : code
}

// Form Events
const addCardButton = document.querySelector("#add-card")
addCardButton.addEventListener("click", () => {
  alert("Cartão adicionado com sucesso!")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})
