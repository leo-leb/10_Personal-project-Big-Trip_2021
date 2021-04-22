import {createButtonRollUp} from '@view/common-templates/btn-roll-up.template';
import {getFullDateSlashAndTime} from '@utils/transform';
import {createElements} from '@utils/render';
import {EventType, ButtonType} from 'consts';

const createOfferTemplate = (offer) => {
  const {title, price} = offer;

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}">
    <label class="event__offer-label" for="event-offer-${title}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
};

const createTypeTemplate = (type) => {
  const lowerType = type.toLowerCase();

  return `<div class="event__type-item">
    <input id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${lowerType}>
    <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${type}</label>
  </div>`;
};

const createPhotosTemplate = (destination) => {
  return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${createElements(destination.pictures.map((pic) => pic.src), (src) => {return `<img class="event__photo" src=${src} alt="Event photo">`;})}
    </div>
  </div>`;
};

const createResetButtonTemplate = (type) => {
  return `<button class="event__reset-btn" type="reset">${type}</button>`;
};

export const createEventFormTemplate = (event, isAdd) => {
  const {basePrice, dateFrom, dateTo, destination, type, offers} = event;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createElements(Object.values(EventType), createTypeTemplate)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value='${getFullDateSlashAndTime(dateFrom)}'>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value='${getFullDateSlashAndTime(dateTo)}'>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice.toString()}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${isAdd ? createResetButtonTemplate(ButtonType.CANCEL) : createResetButtonTemplate(ButtonType.DELETE)}
        ${isAdd ? '' : createButtonRollUp(ButtonType.CLOSE)}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">${createElements(offers, createOfferTemplate)}</div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          ${!isAdd ? '' : createPhotosTemplate(destination)}
        </section>
      </section>
    </form>
  </li>`;
};
