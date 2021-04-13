import {SortType} from '../const';
import {renderList} from '../common';
import {createSortItem} from './sort-item';

export const createSortList = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${renderList(Object.values(SortType), createSortItem)}
  </form>`;
};
