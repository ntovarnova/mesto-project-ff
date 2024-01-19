import { deleteCard } from "./api.js";
const template = document.querySelector("#card-template").content;
const placesItem = template.querySelector(".places__item");

export function createCard(
  cardData,
  handleOpenCard,
  handleLike,
  handleDeleteCard
) {
  const cardId = cardData._id;
  const myId = "f4d71ad79b760e51ae1e7991";
  const isMyCard = cardData.owner ? cardData.owner._id === myId : true;
  const templateElement = placesItem.cloneNode(true);
  const cardImage = templateElement.querySelector(".card__image");
  const cardTitle = templateElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  const deleteButton = templateElement.querySelector(".card__delete-button");
  if (isMyCard) {
    deleteButton.addEventListener("click", () =>
      handleDeleteCard(templateElement, cardId)
    );
  } else {
    deleteButton.remove();
  }
  cardImage.addEventListener("click", () =>
    handleOpenCard(cardData.name, cardData.link)
  );
  const cardLikeButton = templateElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", handleLike);

  return templateElement;
}

export function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId);
  cardElement.remove();
}
