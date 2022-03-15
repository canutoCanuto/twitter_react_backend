const modal = document.querySelector("#modal-container");
const closeModal = document.querySelector("#close-modal");
const openModal = document.querySelector(".btn-tweet");
const asideUserInfo = document.querySelector(".aside-user-info");
const logOutContainer = document.querySelector(".logOut-container");

closeModal.addEventListener("click", () => {
  modal.classList.remove("d-flex");
  modal.classList.add("d-none");
});
openModal.addEventListener("click", () => {
  modal.classList.remove("d-none");
  modal.classList.add("d-flex");
});
document.addEventListener("click", (e) => {
  if (e.target !== logOutContainer) logOutContainer.classList.toggle("d-block");
});
