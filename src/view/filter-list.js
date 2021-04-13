import {FilterType} from '../const';
import {renderList} from '../common';
import {createFilterItem} from './filter-item';

export const createFilterList = () => {
  return `<form class="trip-filters" action="#" method="get">
    ${renderList(Object.values(FilterType), createFilterItem)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
