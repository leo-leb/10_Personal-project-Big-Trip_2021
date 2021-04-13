import {sum} from 'mathjs';

export const createTripInfo = (trip) => {
  const route = Array.from(new Set(trip.map((event) => event.destination.name))).join(' &mdash; ');

  const getPrice = (trip) => {
    const container = [];
    for (const event of trip) {
      container.push(event.base_price);
      event.offers.forEach((elem) => container.push(elem.price));
    }
    return sum(container);
  };

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPrice(trip)}</span>
    </p>
  </section>`;
};
