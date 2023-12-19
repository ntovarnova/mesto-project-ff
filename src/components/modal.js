export function closeModal(x) {
  x.style.visibility = "hidden";
  x.style.opacity = "0";
}
export function openModal(popupElement) {
  popupElement.style.display = "flex";
  popupElement.style.visibility = "visible";
  popupElement.style.opacity = "1";
}
