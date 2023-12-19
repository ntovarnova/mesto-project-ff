export function closeModal(popup) {
  popup.style.visibility = "hidden";
  popup.style.opacity = "0";
}
export function openModal(popupElement) {
  popupElement.style.display = "flex";
  popupElement.style.visibility = "visible";
  popupElement.style.opacity = "1";
}
