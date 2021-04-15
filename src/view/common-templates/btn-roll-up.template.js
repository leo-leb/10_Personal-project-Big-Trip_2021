export const createButtonRollUp = (action) => {
  return `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">${action} event</span>
  </button>`;
};
