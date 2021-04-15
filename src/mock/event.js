import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomValue, getRandomInteger, getRandomNumber} from './utils';
import {getOffers} from './offers';
import {getDestinations} from './destinations';
import {EventType, TimeMeter} from '../consts';

const {YEAR, MONTHES, DAYS, HOURS, MINUTES, SECONDS, MILLISECONDS} = TimeMeter;

const PRICE_LIMIT = 5000;

const offersMock = getOffers();
const destinations = getDestinations();

export const generateEvent  = () => {
  const getType = getRandomValue(Object.values(EventType)).toLowerCase();

  return {
    base_price: getRandomNumber(PRICE_LIMIT),
    date_from: dayjs().set('year', YEAR).set('month', getRandomNumber(MONTHES)).set('day', getRandomNumber(DAYS)).set('hours', getRandomNumber(HOURS)).set('minutes', getRandomNumber(MINUTES)).set('minutes', getRandomNumber(SECONDS)).set('minutes', getRandomNumber(MILLISECONDS)).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    date_to: dayjs().set('year', YEAR).set('month', getRandomNumber(MONTHES)).set('day', getRandomNumber(DAYS)).set('hours', getRandomNumber(HOURS)).set('minutes', getRandomNumber(MINUTES)).set('minutes', getRandomNumber(SECONDS)).set('minutes', getRandomNumber(MILLISECONDS)).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    destination: getRandomValue(destinations),
    id: nanoid(),
    is_favorite: Boolean(getRandomInteger(0, 1)),
    type: getType,
    offers: offersMock.find((element) => {
      return element.type === getType;
    }).offers,
  };
};
