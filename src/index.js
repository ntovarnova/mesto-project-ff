import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, handleLike, handleDeleteCard } from "./components/card.js";

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

initialCards.forEach((cardData) => {
  addCard(cardData);
});

editPopupButton.addEventListener("click", function () {
  openModal(editProfilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

const showError = (input) => {
  input.classList.add('popup__input_type_error')
};

const hideError = (input) => {
input.classList.remove('popup__input_type_error')
};

const checkInputValidity = () => {
  if (!nameInput.validity.valid) {
   showError(nameInput);  
} else {
   hideError(nameInput);
}
};


profileAddButton.addEventListener("click", function () {
  openModal(newCardPopup);
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
    handleOpenCard,
    handleLike,
    handleDeleteCard
  );
  placesContainer.prepend(newCard);
  newPlaceForm.reset();
  closeModal(newCardPopup);
});
