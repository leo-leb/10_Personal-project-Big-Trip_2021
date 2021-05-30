import dayjs from 'dayjs';
import {TimePrefix, TimeMeterInMinutes as TimeMeter} from '../consts';

const getTimeToString = (time) => {
  const modifiedTime = time.toString();

  if (modifiedTime.length === 0) {
    return '00';
  } else if (modifiedTime.length === 1) {
    return '0' + modifiedTime;
  }

  return modifiedTime;
};

const getDefaultDate = (date) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

const getFullDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const getShortDate = (date) => {
  return dayjs(date).format('MMM DD').toUpperCase();
};

const getFullDateAndTime = (date) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
};

const getFullDateSlashAndTime = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};

const getTime = (date) => {
  return dayjs(date).format('HH:mm');
};

const getDuration = (from, to) => {
  return Math.abs(dayjs(from).diff(dayjs(to), 'minutes'));
};

const transformDurationToString = (duration) => {
  if (duration < TimeMeter.HOUR) {
    return getTimeToString(duration) + TimePrefix.MINUTE;
  } else if (duration < TimeMeter.DAY) {
    const hours = Math.floor(duration / TimeMeter.HOUR);
    const minutes = duration - hours * TimeMeter.HOUR;
    return getTimeToString(hours) + TimePrefix.HOUR + ' ' + getTimeToString(minutes) + TimePrefix.MINUTE;
  } else {
    const days = Math.floor(duration / TimeMeter.DAY);
    const hours = Math.floor((duration - days * TimeMeter.DAY)/TimeMeter.HOUR);
    const minutes = Math.floor(duration - days * TimeMeter.DAY - hours * TimeMeter.HOUR);
    return getTimeToString(days) + TimePrefix.DAY + ' ' + getTimeToString(hours) + TimePrefix.HOUR + ' ' + getTimeToString(minutes) + TimePrefix.MINUTE;
  }
};

const getTimeInMinutes = (from, to) => {
  return Math.abs(dayjs(from).diff(dayjs(to), 'minutes'));
};

const stringToClass = (title) => {
  return title.toLowerCase().split(' ').join('-');
};

export {getDefaultDate, getFullDate, getShortDate, getFullDateAndTime, getFullDateSlashAndTime, getTime, getDuration, transformDurationToString, getTimeInMinutes, stringToClass};
