import {sum} from 'mathjs';
import {getDuration} from '@utils/transform';

export const getUniqItems = (items) => [...new Set(items)];

export const countEventPriceByTypes = (events, type) => {
  const container = [];
  const filterToTypes = events.filter((event) => event.type === type);
  for (const event of filterToTypes) {
    container.push(event.basePrice);
  }
  return sum(container);
};

export const countEventsByType = (events, type) => {
  return events.filter((event) => event.type === type).length;
};

export const countEventDurationByTypes = (events, type) => {
  const container = [];
  const filterToTypes = events.filter((event) => event.type === type);
  for (const event of filterToTypes) {
    container.push(getDuration(event.dateFrom, event.dateTo));
  }
  return sum(container);
};
