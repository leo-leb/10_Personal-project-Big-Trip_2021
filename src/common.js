export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const renderList = (source, createItem) => {
  return source.map((value) => createItem(value)).join('');
};
