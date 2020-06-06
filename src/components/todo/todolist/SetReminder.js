import React, {useState, useEffect} from 'react';
import {View, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {VerticalMargin} from '../../common/VerticalMargin';
import {BodyText} from '../../styled/text/BodyText';
import {TitleText} from '../../styled/text/TitleText';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  getReadableDate,
  getReadableTime,
  DatePickerMode,
  getCurrentDate,
} from '../../../utils/dateTime';
import {LinkText} from '../../styled/text/LinkText';

export const SetReminder = ({currentDate, onSelectDate}) => {
  const [date, setDate] = useState(getCurrentDate());
  const [mode, setMode] = useState('date');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const formattedDate = getReadableDate(date);
  const formattedTime = getReadableTime(date);

  useEffect(() => {
    // if there already exists a reminder date, use it
    if (currentDate) {
      setDate(currentDate);
    }
  }, [currentDate]);

  /**
   * Select mode of Date Picker - date (shows calendar) or time (shows clock)
   * @param {*} currentMode
   */
  const showMode = (currentMode) => {
    setDatePickerVisible(true);
    setMode(currentMode);
  };

  const showDatePicker = (selectedMode) => {
    showMode(selectedMode);
  };

  const onSelectDateFromDatePicker = (event, selectedDate) => {
    const currentlySelectedDate = selectedDate || date;
    // TODO: Test on iOS
    setDatePickerVisible(Platform.OS === 'ios');
    setDate(currentDate);
    onSelectDate(currentlySelectedDate);
  };

  return (
    <View>
      <View style={styles.reminderButtonContainer}>
        <LinkText onLinkPress={() => showDatePicker(DatePickerMode.DATE_MODE)}>
          {formattedDate}
        </LinkText>

        <TitleText>{' at '}</TitleText>
        <LinkText onLinkPress={() => showDatePicker(DatePickerMode.TIME_MODE)}>
          {formattedTime}
        </LinkText>

        {datePickerVisible && (
          <DateTimePicker
            timeZoneOffsetInMinutes={0}
            value={date}
            minimumDate={getCurrentDate()}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onSelectDateFromDatePicker}
          />
        )}
      </View>
      <VerticalMargin />
    </View>
  );
};

const styles = StyleSheet.create({
  reminderButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 15,
  },
});

SetReminder.propTypes = {
  onPressAddButton: PropTypes.func.isRequired,
  onPressLogoutButton: PropTypes.func.isRequired,
};

SetReminder.defaultProps = {
  onPressAddButton: () => {},
  onPressLogoutButton: () => {},
};
