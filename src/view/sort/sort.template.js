import {SortType} from 'consts';

const createSortItemTemplate = (sort, actualSort) => {
  return `<div class="trip-sort__item  trip-sort__item--${sort.name}">
    <input id="sort-${sort.name}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${sort.name}" ${sort === actualSort ? 'checked' : sort !== actualSort && sort.isToggle ? '' : 'disabled'}>
    <label class="trip-sort__btn" for="sort-${sort.name}" data-sort-type="${sort.name}">${sort.name}</label>
  </div>`;
};

export const createSortTemplate = (actualSort) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((sort) => createSortItemTemplate(sort, actualSort)).join('')}
    </form>`;
};
