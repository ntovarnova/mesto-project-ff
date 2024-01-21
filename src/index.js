import "./pages/index.css";
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
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupNewPlace = document.querySelector(".profile__add-button");
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
const imageOpenPopupAvatar = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const editAvatarForm = document.forms["edit-avatar"];
const avatarInput = editAvatarForm.querySelector("#link-input");
const avatarButton = editAvatarForm.querySelector("button");
const editButton = editProfileForm.querySelector("button");
const newPlaceButton = newPlaceForm.querySelector("button");
imageOpenPopupAvatar.addEventListener("click", function () {
  editAvatarForm.reset();
  clearValidation(editAvatarForm, validationConfig);
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

buttonOpenPopupProfile.addEventListener("click", function () {
  openModal(editProfilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
});

buttonOpenPopupNewPlace.addEventListener("click", function () {
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

function renderAvatar(url) {
  imageOpenPopupAvatar.style.backgroundImage = `url(${url})`;
}

editAvatarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const oldText = avatarButton.textContent;
  avatarButton.textContent = "Сохранение...";
  updateAvatar(avatarInput.value)
    .then((response) => {
      renderAvatar(response.avatar);
      closeModal(popupAvatar);
      avatarButton.textContent = oldText;
    })
    .catch((err) => {
      console.log(err);
    });
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const oldText = editButton.textContent;
  editButton.textContent = "Сохранение...";
  changeUserInfo(nameInput.value, jobInput.value)
    .then((response) => {
      renderUserInfo(response.name, response.about);
      closeModal(editProfilePopup);
      editButton.textContent = oldText;
    })
    .catch((err) => {
      console.log(err);
    });
});

newPlaceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const oldText = newPlaceButton.textContent;
  newPlaceButton.textContent = "Сохранение...";
  const inputCardName = cardNameInput.value;
  const inputUrl = urlInput.value;
  addNewCard(inputCardName, inputUrl)
    .then((cardData) => {
      cardData.isMyCard = true;
      const newCard = createCard(
        cardData,
        handleOpenCard,
        handleLike,
        handleDeleteCard
      );
      closeModal(newCardPopup);
      placesContainer.prepend(newCard);
      newPlaceForm.reset();
      newPlaceButton.textContent = oldText;
    })
    .catch((err) => {
      console.log(err);
    });
});

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    renderUserInfo(userInfo.name, userInfo.about);
    renderAvatar(userInfo.avatar);
    cards.forEach((cardData) => {
      cardData.isMyCard = cardData.owner._id === userInfo._id;
      cardData.likedByMe = cardData.likes.some((x) => x._id === userInfo._id);
      addCard(cardData);
    });
  })
  .catch((err) => console.log(err));
