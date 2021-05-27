import {FilterType} from 'consts';
import dayjs from 'dayjs';

const currentDate = dayjs();

const futureEvents = (events) => events.filter((event) => dayjs(event.dateFrom) >= currentDate);
const pastEvents = (events) => events.filter((event) => dayjs(event.dateTo) < currentDate);
const middleEvents = (events) => events.filter((event) => dayjs(event.dateFrom) < currentDate && dayjs(event.dateTo) >= currentDate);

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => {
    return [].concat(futureEvents(events), middleEvents(events));
  },
  [FilterType.PAST]: (events) => {
    return [].concat(pastEvents(events), middleEvents(events));
  },
};
