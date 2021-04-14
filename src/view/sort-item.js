export const createSortItem = (sort) => {

  return `<div class="trip-sort__item  trip-sort__item--${sort}">
      <input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" checked>
      <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
    </div>`;
};
