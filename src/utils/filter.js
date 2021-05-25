import {FilterType} from 'consts';
import dayjs from 'dayjs';

const currentDate = dayjs();

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => {
    const firstList = events.filter((event) => dayjs(event.dateFrom) >= currentDate);
    const secondList = events.filter((event) => dayjs(event.dateFrom) < currentDate && dayjs(event.dateTo) >= currentDate);
    return [].concat(firstList, secondList);
  },
  [FilterType.PAST]: (events) => {
    const firstList = events.filter((event) => dayjs(event.dateTo) < currentDate);
    const secondList = events.filter((event) => dayjs(event.dateFrom) < currentDate && dayjs(event.dateTo) >= currentDate);
    return [].concat(firstList, secondList);
  },
};
