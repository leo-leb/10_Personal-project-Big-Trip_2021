import {createButtonRollUp} from 'View/common-templates/btn-roll-up.template';

import {getFullDate, getShortDate, getFullDateAndTime, getTime, getTimeDuration} from 'Utils/transform';
import {createElements} from 'Utils/render';
import {ButtonType} from 'consts';

const createOfferTemplate = (offer) => {
  const {title, price} = offer;

  return `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
</li>`;
};

export const createEventItemTemplate = (event) => {
  const {base_price, date_from, date_to, destination, is_favorite, type, offers} = event;

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${getFullDate(date_from)}>${getShortDate(date_from)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${getFullDateAndTime(date_from)}>${getTime(date_from)}</time>
        &mdash;
        <time class="event__end-time" datetime=${getFullDateAndTime(date_to)}>${getTime(date_to)}</time>
      </p>
      <p class="event__duration">${getTimeDuration(date_from, date_to)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${base_price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">${createElements(offers, createOfferTemplate)}</ul>
    <button class="event__favorite-btn${is_favorite ? ' event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    ${createButtonRollUp(ButtonType.OPEN)}
  </div>
</li>`;
};
