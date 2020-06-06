import moment from 'moment';
const TIME_FORMAT = 'hh:mm a';
const DATE_FORMAT = 'MMMM D, YYYY';

export const DatePickerMode = {
  DATE_MODE: 'date',
  TIME_MODE: 'time',
};

export const getDateFromTimeStamp = (timeStamp) => {
  const d1 = getCurrentDate();
  try {
    const d2 = timeStamp.toDate();
    const dateString = d2.toDateString();
    const same = d1.getDate() === d2.getDate();
    let returnValue = d2.toLocaleTimeString();
    return same ? returnValue : dateString;
  } catch (e) {
    return d1.toLocaleTimeString();
  }
};

export const getCurrentDate = () => {
  return new Date();
};

export const getImmediateReminderDate = () => {
  return new Date(new Date(new Date().getTime() + 5 * 60000));
};

export const getReadableDate = (date) => {
  return moment(date).format(DATE_FORMAT);
};

export const getReadableTime = (time) => {
  return moment(time).format(TIME_FORMAT);
};

export const getReadableReminderDateTime = (timeStamp) => {
  try {
    const d1 = getCurrentDate();
    const timeStampDate = timeStamp.toDate();
    const same = d1.getDate() === timeStampDate.getDate();
    if (same) {
      return 'Today ' + getReadableTime(timeStampDate);
    } else {
      return getReadableDate(timeStampDate);
    }
  } catch (error) {
    console.error(error);
  }
};

export const hasDateAlreadyExpired = (inputDate) => {
  const currentTime = getCurrentDate().getTime();
  const reminderTime = inputDate.getTime();
  return reminderTime < currentTime;
};
