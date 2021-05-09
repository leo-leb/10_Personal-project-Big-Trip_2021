export const EVENT_COUNT = 4;

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const MocksCount = {
  EVENTS: 20,
};

export const TimePrefix = {
  DAY: 'D',
  HOUR: 'H',
  MINUTE: 'M',
};

export const TimeMeter = {
  YEAR: 2021,
  MONTHES: 12,
  DAYS: 30,
  HOURS: 24,
  MINUTES: 60,
  SECONDS: 60,
  MILLISECONDS: 1000,
};

export const TimeMeterInMinutes = {
  HOUR: 60,
  DAY: 1440,
};

export const EventType = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  TRANSPORT: 'Transport',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const SortType = {
  DAY: {
    name: 'day',
    isToggle: true,
  },
  EVENT: {
    name: 'event',
    isToggle: false,
  },
  TIME: {
    name: 'time',
    isToggle: true,
  },
  PRICE: {
    name: 'price',
    isToggle: true,
  },
  OFFERS: {
    name: 'offers',
    isToggle: false,
  },
};

export const ButtonType = {
  OPEN: 'Open',
  CLOSE: 'Close',
  DELETE: 'Delete',
  CANCEL: 'Cancel',
};

export const KeyCode = {
  ESC: 27,
  ENTER: 13,
};

export const EventMode = {
  ITEM: 'ITEM',
  FORM: 'FORM',
};
