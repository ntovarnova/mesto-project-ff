import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, handleLike, handleDeleteCard } from "./components/card.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserInfo,
  changeUserInfo,
  addNewCard,
  updateAvatar,
} from "./components/api.js";
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
const imagePopup = document.querySelector(".popup_type_image");
const caption = imagePopup.querySelector(".popup__caption");
const img = imagePopup.querySelector("img");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
const profileImage = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const editAvatar = document.forms["edit-avatar"];

profileImage.addEventListener("click", function () {
  editAvatar.reset();
  clearValidation(editAvatar, validationConfig);
  openModal(popupAvatar);
});

function handleOpenCard(imageTitle, imageSrc) {
  img.src = imageSrc;
  img.alt = imageTitle;
  caption.textContent = imageTitle;
  openModal(imagePopup);
}

function addCard(cardData) {
  const templateElement = createCard(
    cardData,
    handleOpenCard,
    handleLike,
    handleDeleteCard
  );
  placeList.append(templateElement);
}

editPopupButton.addEventListener("click", function () {
  openModal(editProfilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
});

profileAddButton.addEventListener("click", function () {
  openModal(newCardPopup);
  cardNameInput.value = "";
  urlInput.value = "";
  clearValidation(newPlaceForm, validationConfig);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup
    .querySelector("button.popup__close")
    .addEventListener("click", function () {
      closeModal(popup);
    });
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closeModal(popup);
    }
  });
});

function renderUserInfo(name, about) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
}

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderUserInfo(nameInput.value, jobInput.value);
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
    handleOpenCard,
    handleLike,
    handleDeleteCard
  );
  placesContainer.prepend(newCard);
  newPlaceForm.reset();
  addNewCard(inputCardName, inputUrl);
  closeModal(newCardPopup);
});

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()]).then(([userInfo, cards]) => {
  renderUserInfo(userInfo.name, userInfo.about);
  cards.forEach((cardData) => {
    addCard(cardData);
  });
});