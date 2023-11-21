// @todo: Темплейт карточки
function addCard(cardData, handleDeleteCard) {
  const template = document.querySelector("#card-template").content;
  const templateElement = template
    .querySelector(".places__item")
    .cloneNode(true);

  templateElement.querySelector(".card__title").textContent = cardData.name;
  templateElement.querySelector(".card__image").src = cardData.link;
  templateElement.querySelector(".card__image").alt = cardData.name;

  const deleteButton = templateElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDeleteCard);

  document.querySelector('.places__list').append(templateElement);
}

function handleDeleteCard(e) {
  e.target.closest('.places__item').remove();
}

initialCards.forEach((x) => {
  addCard(x, handleDeleteCard);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
