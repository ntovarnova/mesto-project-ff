import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';

// @todo: Темплейт карточки
function addCard(cardData, handleDeleteCard) {
  const templateElement = createCard(cardData, handleDeleteCard);
  const placeList = document.querySelector(".places__list");
  placeList.append(templateElement);
}

function createCard(cardData, handleDeleteCard) {
  const template = document.querySelector("#card-template").content;
  const templateElement = template
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = templateElement.querySelector(".card__image");
  const cardTitle = templateElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  const deleteButton = templateElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDeleteCard);
  return templateElement;
}

function handleDeleteCard(e) {
  e.target.closest(".places__item").remove();
}

initialCards.forEach((x) => {
  addCard(x, handleDeleteCard);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

