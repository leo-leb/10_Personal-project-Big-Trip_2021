import {FilterType} from 'consts';
import dayjs from 'dayjs';

const currentDate = dayjs();

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs(event.dateFrom) > currentDate),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs(event.dateTo) < currentDate),
};
