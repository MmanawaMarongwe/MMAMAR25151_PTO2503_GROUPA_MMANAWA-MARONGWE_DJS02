/**
 * A simple controller to open/close a modal.
 *
 * - `openModal()` clears the modal, appends modal content, and shows the container (display: "block").
 * - `closeModal()` hides the modal and clears its contents.
 *
 * @param {HTMLElement} modalContainer - The overlay that hosts modal content.
 * @returns {{ openModal: (modalContent: HTMLElement) => void, closeModal: () => void }} - Open and closed state of the modal
 */
export function modalState(modalContainer) {
  return {
    openModal(modalContent) {
      modalContainer.innerHTML = "";
      modalContainer.appendChild(modalContent);
      modalContainer.style.display = "block";
    },
    closeModal() {
      modalContainer.style.display = "none";
      modalContainer.innerHTML = "";
    }, // accepts the container; controls it internally
  };
}
