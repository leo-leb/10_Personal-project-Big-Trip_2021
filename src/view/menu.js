import AbstractView from '@view/abstract';
import {MenuItem} from 'consts';

const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-value=${MenuItem.TABLE}>Table</a>
    <a class="trip-tabs__btn" href="#" data-value=${MenuItem.STATS}>Stats</a>
  </nav>`;
};

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._currentValue = MenuItem.TABLE;

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  getCurrentValue() {
    return this._currentValue;
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(actualValue) {
    const currentlItemElement = this.getElement().querySelector(`[data-value=${this._currentValue}]`);
    const actualItemElement = this.getElement().querySelector(`[data-value=${actualValue}]`);

    currentlItemElement.classList.remove('trip-tabs__btn--active');
    actualItemElement.classList.add('trip-tabs__btn--active');

    this._currentValue = actualValue;
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    const actualValue = evt.target.dataset.value;

    if (actualValue === this._currentValue) {
      return;
    }

    this.setMenuItem(actualValue);
    this._callback.menuClick(actualValue);
  }
}
