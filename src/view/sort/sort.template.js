import {createElements} from '../../utils/render';

const createSortItemTemplate = (sort) => {
  return `<div class="trip-sort__item  trip-sort__item--${sort}">
    <input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" checked>
    <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
  </div>`;
};

export const createSortTemplate = (sortItems) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createElements(Object.values(sortItems), createSortItemTemplate)}
    </form>`;
};
