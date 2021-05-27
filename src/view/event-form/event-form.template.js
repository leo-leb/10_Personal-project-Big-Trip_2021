import {createButtonRollUp} from '@view/common-templates/btn-roll-up.template';
import {getFullDateSlashAndTime, stringToClass} from '@utils/transform';
import {createElements} from '@utils/render';
import {EventType, ButtonType} from 'consts';

const createOfferTemplate = (item, offers) => {
  const {title, price} = item;

  const isChecked = offers.find((offer) => offer.title === item.title);

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${stringToClass(title)}" type="checkbox" name="event-offer-${stringToClass(title)}" ${isChecked ? 'checked' : ''}>
    <label class="event__offer-label" for="${stringToClass(title)}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
};

const createOffersContainer = (offersForEventType, offers) => {
  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offersForEventType.map((item) => createOfferTemplate(item, offers)).join('')}
    </div>
  </section>`;
};

const createDestinationsContainer = (destination, isAdd) => {
  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${destination.description.length > 0 ? createDescriptionTemplate(destination) : ''}
    ${isAdd && destination.pictures.length > 0 ? createPhotosTemplate(destination) : ''}
</section>`;
};

const createTypeTemplate = (type) => {
  const lowerType = type.toLowerCase();

  return `<div class="event__type-item">
    <input id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${lowerType}>
    <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1" data-type=${lowerType}>${type}</label>
  </div>`;
};

const createPhotosTemplate = (destination) => {
  return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${createElements(destination.pictures.map((pic) => pic.src), (src) => {return `<img class="event__photo" src=${src} alt="Event photo">`;})}
    </div>
  </div>`;
};

const createDescriptionTemplate = (destination) => {
  return `<p class="event__destination-description">${destination.description}</p>`;
};

const createDestinationList = (destinations) => {
  return `<datalist id="destination-list-1">
    ${createElements(destinations.map((point) => point.name), (name) => {return `<option value=${name}>`;})}
  </datalist>`;
};

const createResetButtonTemplate = (type, isDeleting) => {
  if (type === ButtonType.CANCEL) {
    return `<button class="event__reset-btn" type="reset">${ButtonType.CANCEL}</button>`;
  } else {
    return `<button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>`;
  }
};

export const createEventFormTemplate = (isAdd, event, destinationsLib, offersLib) => {
  const {basePrice, dateFrom, dateTo, destination, type, offers, isDisabled, isSaving, isDeleting} = event;
  const offersForEventType = type.length > 1 ? offersLib.find((elem) => elem.type === type).offers : [];

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            ${type.length > 0 ?
              `<img class="event__type-icon" width="17" height="17" alt="Event type icon" src="img/icons/${type}.png"></img>` :
              ''
            }
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" list="destination-list-1" value=${destination.name} ${isDisabled ? 'disabled' : ''}>
          ${createDestinationList(destinationsLib)}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value='${getFullDateSlashAndTime(dateFrom)}' ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value='${getFullDateSlashAndTime(dateTo)}' ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${basePrice.toString()} ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        ${isAdd ? createResetButtonTemplate(ButtonType.CANCEL) : createResetButtonTemplate(ButtonType.DELETE, isDeleting)}
        ${isAdd ? '' : createButtonRollUp(ButtonType.CLOSE)}
      </header>
      <section class="event__details">
        ${offersForEventType.length > 0 ? createOffersContainer(offersForEventType, offers) : ''}
        ${destination.description.length === 0 && destination.pictures.length === 0 ? '' : createDestinationsContainer(destination, isAdd)}
      </section>
    </form>
  </li>`;
};
