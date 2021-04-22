import {getTimeInMinutes} from '@utils/transform';

const START = '0000-00-00T00:00:00.000';

export const getEventsByTime = (events) => {
  return events.sort((firstItem, secondItem) => {
    return getTimeInMinutes(secondItem.date_from, secondItem.date_to) - getTimeInMinutes(firstItem.date_from, firstItem.date_to);
  });
};

export const getEventsByPrice = (events) => {
  return events.sort((firstItem, secondItem) => {
    return secondItem.base_price - firstItem.base_price;
  });
};

export const getEventsByDate = (events) => {
  return events.sort((firstItem, secondItem) => {
    return getTimeInMinutes(START, firstItem.date_from) - getTimeInMinutes(START, secondItem.date_from);
  });
};
