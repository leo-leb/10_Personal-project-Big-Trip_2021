import {getTimeInMinutes} from '@utils/transform';

const START = '0000-00-00T00:00:00.000';

const getEventsByTime = (events) => {
  return events.sort((firstItem, secondItem) => {
    return getTimeInMinutes(secondItem.dateFrom, secondItem.dateTo) - getTimeInMinutes(firstItem.dateFrom, firstItem.dateTo);
  });
};

const getEventsByPrice = (events) => {
  return events.sort((firstItem, secondItem) => {
    return secondItem.basePrice - firstItem.basePrice;
  });
};

const getEventsByDate = (events) => {
  return events.sort((firstItem, secondItem) => {
    return getTimeInMinutes(START, firstItem.dateFrom) - getTimeInMinutes(START, secondItem.dateFrom);
  });
};

export {getEventsByTime, getEventsByPrice, getEventsByDate};
