import dayjs from 'dayjs';
import {TimePrefix, TimeMeterInMinutes as TimeMeter} from '../consts';

const getTimeToString = (time) => {
  const modifiedTime = time.toString();
  if (modifiedTime.length === 0) {
    return '00';
  } else if (modifiedTime.length === 1) {
    return '0' + modifiedTime;
  } else {
    return modifiedTime;
  }
};

export const getFullDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const getShortDate = (date) => {
  return dayjs(date).format('MMM DD').toUpperCase();
};

export const getFullDateAndTime = (date) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
};

export const getFullDateSlashAndTime = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};

export const getTime = (date) => {
  return dayjs(date).format('HH:mm');
};

export const getTimeDuration = (from, to) => {
  const duration = Math.abs(dayjs(from).diff(dayjs(to), 'minutes'));

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

export const getTimeInMinutes = (from, to) => {
  return Math.abs(dayjs(from).diff(dayjs(to), 'minutes'));
};

export const stringToClass = (title) => {
  return title.toLowerCase().split(' ').join('-');
};
