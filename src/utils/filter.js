import {FilterType} from 'consts';
import dayjs from 'dayjs';

const currentDate = dayjs();

const getFutureEvents = (events) => events.filter((event) => dayjs(event.dateFrom) >= currentDate);
const getPastEvents = (events) => events.filter((event) => dayjs(event.dateTo) < currentDate);
const getMiddleEvents = (events) => events.filter((event) => dayjs(event.dateFrom) < currentDate && dayjs(event.dateTo) >= currentDate);

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => {
    return [].concat(getFutureEvents(events), getMiddleEvents(events));
  },
  [FilterType.PAST]: (events) => {
    return [].concat(getPastEvents(events), getMiddleEvents(events));
  },
};
