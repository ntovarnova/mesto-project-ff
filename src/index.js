import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal.js";

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
  cardImage.addEventListener("click", () => {
    const img = TypeImage.querySelector("img");
    img.src = cardImage.src;
    img.alt = cardImage.alt;
    const caption = TypeImage.querySelector(".popup__caption");
    caption.textContent = cardImage.alt;
    openModal(TypeImage);
  });
  return templateElement;
}

function handleDeleteCard(e) {
  e.target.closest(".places__item").remove();
}

initialCards.forEach((x) => {
  addCard(x, handleDeleteCard);
});

const editPopupButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const typenNewCard = document.querySelector(".popup_type_new-card");
const TypeImage = document.querySelector(".popup_type_image");

editPopupButton.addEventListener("click", function () {
  openModal(editPopup); // открываем попап редактирования
});

profileAddButton.addEventListener("click", function () {
  openModal(typenNewCard);
});

document.querySelectorAll(".popup").forEach((p) => {
  p.querySelector("button.popup__close").onclick = () => closeModal(p);
  window.addEventListener("click", (e) => {
    if (e.target === p) {
      closeModal(p);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal(p);
    }
  });
});
// вызываем функцию закрытия
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// Находим форму в DOM
const formElement = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
nameInput.value = "Жак-Ив Кусто";
jobInput.value = "Исследователь океана";
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector(".popup__input_type_name").value;
  const jobInput = document.querySelector(
    ".popup__input_type_description"
  ).value;
  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__description").textContent = jobInput;
  closeModal(editPopup);
});

const form = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const placesContainer = document.querySelector(".places__list");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputCardName = cardNameInput.value;
  const inputUrl = urlInput.value;
  const NewCard = createCard(
    {
      name: inputCardName,
      link: inputUrl,
    },
    handleDeleteCard
  );
  placesContainer.prepend(NewCard);
  form.reset();
  closeModal(typenNewCard);
});
