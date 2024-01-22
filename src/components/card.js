import { deleteCard, like, unlike } from "./api.js";
const template = document.querySelector("#card-template").content;
const placesItem = template.querySelector(".places__item");

export function createCard(
  cardData,
  handleOpenCard,
  handleLike,
  handleDeleteCard
) {
  const cardId = cardData._id;
  const isMyCard = cardData.isMyCard;
  const likes = cardData.likes;
  const likedByMe = cardData.likedByMe;
  const templateElement = placesItem.cloneNode(true);
  const cardImage = templateElement.querySelector(".card__image");
  const cardTitle = templateElement.querySelector(".card__title");
  const likeCount = templateElement.querySelector(".card__like-count");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = likes.length;
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
  cardLikeButton.addEventListener("click", (e) =>
    handleLike(e, cardId, likeCount)
  );
  if (likedByMe) cardLikeButton.classList.toggle("card__like-button_is-active");
  return templateElement;
}

export function handleLike(evt, cardId, likeCount) {
  const heart = evt.target;
  (heart.classList.contains("card__like-button_is-active")
    ? unlike(cardId)
    : like(cardId)
  )
    .then((result) => {
      likeCount.textContent = result.likes.length;
    })
    .catch((err) => console.log(err));
  heart.classList.toggle("card__like-button_is-active");
}

export function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
    .then((x) => cardElement.remove())
    .catch((err) => console.log(err));
}
