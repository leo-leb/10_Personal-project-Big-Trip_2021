const createFilterItemTemplate = (filter, currentFilter) => {
  return `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filter} ${filter === currentFilter ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`;
};

export const createFilterTemplate = (filterItems, currentFilter) => {
  return `<form class="trip-filters" action="#" method="get">
    ${Object.values(filterItems).map((filter) => createFilterItemTemplate(filter, currentFilter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
