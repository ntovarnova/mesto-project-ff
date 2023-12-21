import { openModal } from "./modal.js";

const template = document.querySelector("#card-template").content;
const placesItem = template.querySelector(".places__item");

export function createCard(cardData, handleOpenCard, handleLike) {
  const templateElement = placesItem.cloneNode(true);
  const cardImage = templateElement.querySelector(".card__image");
  const cardTitle = templateElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  const deleteButton = templateElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () =>
    handleDeleteCard(templateElement)
  );
  cardImage.addEventListener("click", () => handleOpenCard(cardData.name, cardData.link));
  const cardLikeButton = templateElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", handleLike);

  return templateElement;
}

export function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(cardElement) {
  cardElement.remove();
}
