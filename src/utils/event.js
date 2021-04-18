import {KeyCode} from 'consts';

export const isEscEvent = (evt, action) => {
  if (evt.keyCode === KeyCode.ESC) {
    evt.preventDefault();
    action();
  }
};
