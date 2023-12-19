import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, handleDeleteCard } from "./components/card.js";

const editPopupButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfileForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const placeList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const placesContainer = document.querySelector(".places__list");

function addCard(cardData, handleDeleteCard) {
  const templateElement = createCard(cardData, handleDeleteCard);
  placeList.append(templateElement);
}

initialCards.forEach((cardData) => {
  addCard(cardData, handleDeleteCard);
});

editPopupButton.addEventListener("click", function () {
  openModal(editProfilePopup);
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

document.querySelectorAll(".popup").forEach((p) => {
  p.querySelector("button.popup__close").addEventListener("click", function () {
    closeModal(p);
  });
  p.addEventListener("click", (e) => {
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

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(editProfilePopup);
});

newPlaceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputCardName = cardNameInput.value;
  const inputUrl = urlInput.value;
  const newCard = createCard(
    {
      name: inputCardName,
      link: inputUrl,
    },
    handleDeleteCard
  );
  placesContainer.prepend(newCard);
  newPlaceForm.reset();
  closeModal(newCardPopup);
});
