const careerDuration = document.querySelector("#career-duration");
const imageModal = document.querySelector(".image-modal");
const imageModalTitle = document.querySelector("#image-modal-title");
const imageModalImage = document.querySelector(".image-modal img");
const visualButtons = document.querySelectorAll("[data-image]");
const recordModal = document.querySelector(".record-modal");
const openRecordButton = document.querySelector("[data-open-record]");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const closeRecordButtons = document.querySelectorAll("[data-close-record]");

function getCareerDuration(startDate, endDate = new Date()) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (endDate.getDate() < startDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years}년 ${months}개월`;
}

function renderCareerDuration() {
  if (!careerDuration) return;

  const startDate = new Date(`${careerDuration.dataset.startDate}T00:00:00`);
  careerDuration.textContent = getCareerDuration(startDate);
}

function lockScroll() {
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  document.body.style.overflow = "";
}

function openImageModal(button) {
  if (!imageModal || !imageModalImage || !imageModalTitle) return;

  imageModalTitle.textContent = button.dataset.title || "Preview";
  imageModalImage.src = button.dataset.image;
  imageModalImage.alt = button.querySelector("img")?.alt || "";
  imageModal.hidden = false;
  lockScroll();
  imageModal.querySelector(".modal-close")?.focus();
}

function closeImageModal() {
  if (!imageModal || imageModal.hidden) return;

  imageModal.hidden = true;
  imageModalImage.src = "";
  unlockScroll();
}

function openRecordModal() {
  if (!recordModal) return;

  recordModal.hidden = false;
  lockScroll();
  recordModal.querySelector(".modal-close")?.focus();
}

function closeRecordModal() {
  if (!recordModal || recordModal.hidden) return;

  recordModal.hidden = true;
  unlockScroll();
  openRecordButton?.focus();
}

visualButtons.forEach((button) => {
  button.addEventListener("click", () => openImageModal(button));
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeImageModal);
});

openRecordButton?.addEventListener("click", openRecordModal);

closeRecordButtons.forEach((button) => {
  button.addEventListener("click", closeRecordModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  closeImageModal();
  closeRecordModal();
});

renderCareerDuration();
