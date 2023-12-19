import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, handleDeleteCard } from "./components/card.js";

function addCard(cardData, handleDeleteCard) {
  const templateElement = createCard(cardData, handleDeleteCard);
  const placeList = document.querySelector(".places__list");
  placeList.append(templateElement);
}

initialCards.forEach((x) => {
  addCard(x, handleDeleteCard);
});

const editPopupButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const typenNewCard = document.querySelector(".popup_type_new-card");


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
