// modules/showModal.js
import { createModal } from "./createModal.js";
import { modalState } from "./modalState.js";

/**
 * Open and wire the podcast details modal.
 *
 * Builds a modal from `pod` with `createModal`, appends it to `modalContainer`,
 * opens it via `modalState`, and binds close handlers (overlay click, "X" button, Escape key).
 *
 * @param {{image:string, title:string, description:string, genreNames:() => string[], formattedUpdatedAt:() => string, seasonTitles:() => string[]}} pod
 * @param {HTMLElement} modalContainer - Overlay/root element that hosts the modal.
 * @returns {void}
 */
export function renderModal(pod, modalContainer) {
  const modal = createModal({
    cover: pod.image,
    name: pod.title,
    description: pod.description,
    genreTags: pod.genreNames(),
    lastUpdate: pod.formattedUpdatedAt(),
    seasonsInfo: pod.seasonTitles(),
  });

  modalContainer.appendChild(modal);
  modalContainer.style.display = "block";

  const { openModal, closeModal } = modalState(modalContainer);
  openModal(modal);

  // Close on overlay click
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) closeModal();
  });

  // Close on button click
  modal.querySelector(".modal-close").addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}
