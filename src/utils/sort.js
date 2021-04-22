import {getTimeInMinutes} from '@utils/transform';

const START = '0000-00-00T00:00:00.000';

export const getEventsByTime = (events) => {
  return events.sort((firstItem, secondItem) => {
    return getTimeInMinutes(secondItem.dateFrom, secondItem.dateTo) - getTimeInMinutes(firstItem.dateFrom, firstItem.dateTo);
  });
};

export const getEventsByPrice = (events) => {
  return events.sort((firstItem, secondItem) => {
    return secondItem.basePrice - firstItem.basePrice;
  });
};

export const getEventsByDate = (events) => {
  return events.sort((firstItem, secondItem) => {
    return getTimeInMinutes(START, firstItem.dateFrom) - getTimeInMinutes(START, secondItem.dateFrom);
  });
};
