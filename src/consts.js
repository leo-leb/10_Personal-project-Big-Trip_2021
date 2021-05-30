const EVENT_COUNT = 4;
const STORE_EVENTS_PREFIX = 'EVENTS';
const STORE_DESTINATIONS_PREFIX = 'DESTINATIONS';
const STORE_OFFERS_PREFIX = 'OFFERS';
const STORE_VER = 'v1';

const StoreName = {
  EVENTS: `${STORE_EVENTS_PREFIX}-${STORE_VER}`,
  DESTINATIONS: `${STORE_DESTINATIONS_PREFIX}-${STORE_VER}`,
  OFFERS: `${STORE_OFFERS_PREFIX}-${STORE_VER}`,
};

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const TimePrefix = {
  DAY: 'D',
  HOUR: 'H',
  MINUTE: 'M',
};

const TimeMeter = {
  YEAR: 2021,
  MONTHES: 12,
  DAYS: 30,
  HOURS: 24,
  MINUTES: 60,
  SECONDS: 60,
  MILLISECONDS: 1000,
};

const TimeMeterInMinutes = {
  HOUR: 60,
  DAY: 1440,
};

const EventType = {
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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
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

const ButtonType = {
  OPEN: 'Open',
  CLOSE: 'Close',
  DELETE: 'Delete',
  CANCEL: 'Cancel',
};

const KeyCode = {
  ESC: 27,
  ENTER: 13,
};

const EventMode = {
  ITEM: 'ITEM',
  FORM: 'FORM',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const MenuItem = {
  TABLE: 'TABLE',
  STATS: 'STATS',
};

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export {
  EVENT_COUNT,
  STORE_EVENTS_PREFIX,
  STORE_DESTINATIONS_PREFIX,
  STORE_OFFERS_PREFIX,
  STORE_VER,
  StoreName,
  RenderPosition,
  TimePrefix,
  TimeMeter,
  TimeMeterInMinutes,
  EventType,
  FilterType,
  SortType,
  ButtonType,
  KeyCode,
  EventMode,
  UserAction,
  UpdateType,
  MenuItem,
  State
};
