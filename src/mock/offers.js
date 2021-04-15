import {getRandomOffers} from './utils';

const PRICE_LIMIT = 500;

const typesMock = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const offersMock = ['Upgrade to a business class', 'Choose the radio station', 'Choose meal', 'Upgrade to comfort class', 'Choose seat'];

const createOffer = (type) => {
  return {
    type,
    offers: getRandomOffers(offersMock, PRICE_LIMIT).slice(0, 4),
  };
};

export const getOffers = () => {
  const list = [];
  for (const type of typesMock) {
    list.push(createOffer(type));
  }
  return list;
};
