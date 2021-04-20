import AbstractView from '@view/abstract';

const createEventListContainerTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class EventListContainer extends AbstractView {
  getTemplate() {
    return createEventListContainerTemplate();
  }
}
