import {createElements} from '../../utils/render';

const createFilterItemTemplate = (filter) => {
  return `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filter} checked>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`;
};

export const createFilterTemplate = (filterItems) => {
  return `<form class="trip-filters" action="#" method="get">
    ${createElements(Object.values(filterItems), createFilterItemTemplate)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
