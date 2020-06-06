import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {BodyText} from '../../styled/text/BodyText';
import {TitleText} from '../../styled/text/TitleText';
import {VerticalMargin} from '../../common/VerticalMargin';
import {
  getReadableReminderDateTime,
  hasDateAlreadyExpired,
} from '../../../utils/dateTime';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TodoListItem = ({item, index, showTodoDetails}) => {
  const isExpired = item.remindDate
    ? hasDateAlreadyExpired(item.remindDate.toDate())
    : false;

  const dateColor = 'grey';

  const iconName = isExpired ? 'history' : 'access-alarm';

  const textStyle = isExpired
    ? {textDecorationLine: 'line-through', color: dateColor, fontSize: 13}
    : {color: dateColor, fontSize: 13};

  const reminderDate = item.remindDate
    ? getReadableReminderDateTime(item.remindDate)
    : null;

  return (
    <TouchableWithoutFeedback onPress={() => showTodoDetails(item)}>
      <View style={{...styles.listItemContainer}}>
        <View>
          <TitleText maxLines={1}>{item.title}</TitleText>
          <VerticalMargin />
          <BodyText maxLines={3}>{item.description}</BodyText>
          {reminderDate && (
            <View>
              <VerticalMargin />
              <View style={styles.reminderContainer}>
                <Icon
                  name={iconName}
                  color={dateColor}
                  size={17}
                  style={styles.iconContainer}
                />
                <BodyText style={textStyle}>{reminderDate}</BodyText>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reminderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 5,
  },
});
