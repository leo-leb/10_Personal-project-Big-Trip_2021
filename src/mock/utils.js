const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomNumber = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber);
};

const getRandomOffers = (offers, priceLimit) => {
  const offersCount = getRandomInteger(offers.length - 1);
  let result = [];
  for (let i = 0; i <= offersCount; i++) {
    result.push(getRandomValue(offers));
  }
  const result2 = new Set(result);
  result = [];
  for (const offer of result2) {
    result.push({
      'title': offer,
      'price': getRandomNumber(priceLimit),
    });
  }

  return result;
};

const getRandomPictures = (name, picturesLimit) => {
  const picturesCount = getRandomNumber(picturesLimit);
  const result = [];
  for (let i = 0; i < picturesCount; i++) {
    result.push({
      src: 'http://picsum.photos/300/200?r=' + Math.random().toString(),
      description: name,
    });
  }

  return result;
};

const getRandomParagraph = (array, limit) => {
  const volume = getRandomInteger(1, limit);
  const values = () => {
    let result = '';
    for (let i = 1; i <= volume; i++) {
      if (i !== volume) {
        result = result + getRandomValue(array) + ' ';
      } else {
        result = result + getRandomValue(array);
      }
    }
    return result;
  };

  return values();
};

export {getRandomValue, getRandomInteger, getRandomNumber, getRandomOffers, getRandomPictures, getRandomParagraph};
