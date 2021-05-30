const createFilterItemTemplate = (filter, currentFilter, emptyList) => {
  const checkEmpty = emptyList.includes(filter);
  return `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filter} ${filter === currentFilter ? 'checked' : ''} ${checkEmpty ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`;
};

export const createFilterTemplate = (filterItems, currentFilter, emptyList) => {
  return `<form class="trip-filters" action="#" method="get">
    ${Object.values(filterItems).map((filter) => createFilterItemTemplate(filter, currentFilter, emptyList)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
