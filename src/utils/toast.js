const SHOW_TIME = 5000;

const toastContainer = document.createElement('div');
toastContainer.classList.add('toast-container');
document.body.prepend(toastContainer);

export const toast = (message) => {
  const toastItem = document.createElement('div');
  toastItem.textContent = message;
  toastItem.classList.add('toast-item');

  toastContainer.append(toastItem);

  setTimeout(() => {
    toastItem.remove();
  }, SHOW_TIME);
};
