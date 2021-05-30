import {sum} from 'mathjs';
import {getDuration} from '@utils/transform';

const getUniqItems = (items) => [...new Set(items)];

const countEventPriceByTypes = (events, type) => {
  const prices = [];
  const filterToTypes = events.filter((event) => event.type === type);
  for (const event of filterToTypes) {
    prices.push(event.basePrice);
  }
  return sum(prices);
};

const countEventsByType = (events, type) => {
  return events.filter((event) => event.type === type).length;
};

const countEventDurationByTypes = (events, type) => {
  const durations = [];
  const filterToTypes = events.filter((event) => event.type === type);
  for (const event of filterToTypes) {
    durations.push(getDuration(event.dateFrom, event.dateTo));
  }
  return sum(durations);
};

export {getUniqItems, countEventPriceByTypes, countEventsByType, countEventDurationByTypes};
