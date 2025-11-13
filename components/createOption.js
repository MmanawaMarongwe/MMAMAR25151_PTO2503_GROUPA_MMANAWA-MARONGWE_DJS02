/**
 *
 * @param {*} selectEl - The select element where an option will be appended
 * @param {*} value - The value passed into the option element
 */
export function createOpt(selectEl, value) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  selectEl.appendChild(option);
}
