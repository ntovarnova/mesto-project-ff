export function createCard(cardData, handleDeleteCard) {
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
  cardImage.addEventListener("click", () => {
    const img = TypeImage.querySelector("img");
    img.src = cardImage.src;
    img.alt = cardImage.alt;
    const caption = TypeImage.querySelector(".popup__caption");
    caption.textContent = cardImage.alt;
    openModal(TypeImage);
  });
  const cardLikeButton = templateElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });
  return templateElement;
}

export function handleDeleteCard(e) {
  e.target.closest(".places__item").remove();
}