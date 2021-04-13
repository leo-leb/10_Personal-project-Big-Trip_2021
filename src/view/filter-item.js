export const createFilterItem = (filter) => {

  return `<div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filter} checked>
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`;
};
