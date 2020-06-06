import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {VerticalMargin} from '../components/common/VerticalMargin';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SetReminder} from '../components/todo/todolist/SetReminder';
import {ButtonText} from '../components/styled/text/ButtonText';
import {showAlert} from '../utils/alertUtils';
import {isTodoNonEmpty} from '../utils/todoListUtils';
import {ErrorText} from '../components/styled/text/ErrorText';
import {getCurrentDate, getImmediateReminderDate, hasDateAlreadyExpired} from '../utils/dateTime';
import {
  TodoDeleteAlert,
  TodoDetailsPageMode,
  TodoErrors,
} from '../utils/constants';

const TodoDetails = (props) => {
  const [isReminderEnabled, setReminderEnabled] = useState(false);
  const [pageMode, setPageMode] = useState('add');
  const toggleSwitch = () =>
    setReminderEnabled((previousState) => !previousState);

  // Set data for NEW todo
  let item = {};
  let title = null;
  let description = null;
  let deleteTodo = null;
  let updateTodo = null;
  let addTodo = null;
  let remindDate = null;

  // Show Existing Todo date if user wants to EDIT
  const {navigation} = props;
  if (navigation.state.params) {
    const {pageMode} = navigation.state.params;
    // user wants to UPDATE existing Todo
    if (pageMode === TodoDetailsPageMode.EDIT) {
      item = navigation.state.params.item ? navigation.state.params.item : null;
      title = item.title ? item.title : null;
      description = item.description ? item.description : null;
      remindDate = item.remindDate ? item.remindDate : null;
      deleteTodo = navigation.state.params.deleteTodo
        ? navigation.state.params.deleteTodo
        : null;
      updateTodo = navigation.state.params.updateTodo
        ? navigation.state.params.updateTodo
        : null;
    } else if (pageMode === TodoDetailsPageMode.NEW) {
      // user wants to CREATE a new todo
      addTodo = navigation.state.params.addTodo
        ? navigation.state.params.addTodo
        : null;
    }
  }

  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);
  const [reminderDate, setReminderDate] = useState(getImmediateReminderDate());
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // Set Reminder Date (if already exists (in mode EDIT))
  useEffect(() => {
    if (remindDate) {
      setReminderEnabled(true);
      setReminderDate(remindDate.toDate());
    }
  }, [remindDate]);

  // Determine whether or not to show DELETE icon
  useEffect(() => {
    const {navigation} = props;
    if (navigation.state.params) {
      const {pageMode} = navigation.state.params;
      setPageMode(pageMode);
    }
  }, [props, setPageMode]);

  const notificationIcon = isReminderEnabled
    ? 'notifications-active'
    : 'notifications-none';

  const onPressDelete = () => {
    showAlert(
      TodoDeleteAlert.title,
      TodoDeleteAlert.message,
      () => {
        deleteTodo ? deleteTodo(item.id) : null;
        navigation.goBack();
      },
      () => {},
      false,
    );
  };

  // UPDATE TO DO ITEM
  const saveTodoItem = () => {
    const remindDate = isReminderEnabled ? reminderDate : null;
    // Check that user does not select expired time for reminder notification
    if (isReminderEnabled && hasDateAlreadyExpired(remindDate)) {
      setError(TodoErrors.EXPIRED_TIME);
      return;
    }

    const updatedItem = {
      ...item,
      title: todoTitle,
      description: todoDescription,
      remindDate,
    };

    // check for valid todoItem content
    if (isTodoNonEmpty(updatedItem)) {
      navigation.goBack();
      updateTodo
        ? updateTodo(updatedItem)
        : addTodo({...updatedItem, createdAt: getCurrentDate()});
    } else {
      setError(TodoErrors.EMPTY_CONTENT);
    }
  };

  const showDeleteIcon = pageMode === TodoDetailsPageMode.EDIT;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconRow}>
        <Icon
          name="close"
          color="white"
          size={25}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {showDeleteIcon && (
          <Icon
            name="delete"
            color="white"
            size={25}
            onPress={() => {
              onPressDelete(item);
            }}
          />
        )}
      </View>

      <View style={styles.textContainer}>
        <TextInput
          style={styles.titleText}
          multiline={true}
          value={todoTitle}
          placeholder={'Title'}
          onChangeText={(text) => {
            setError(null);
            setTodoTitle(text);
          }}
        />
        <TextInput
          ref={inputRef}
          style={styles.bodyText}
          multiline={true}
          placeholder={'Description'}
          numberOfLines={20}
          value={todoDescription}
          onChangeText={(text) => {
            setError(null);
            setTodoDescription(text);
          }}
        />
      </View>

      <View style={styles.toggleContainer}>
        <Icon name={notificationIcon} size={25} onPress={toggleSwitch} />
        {!isReminderEnabled && (
          <Text style={styles.toggleText}>{'No reminder set'}</Text>
        )}
        {isReminderEnabled && (
          <SetReminder
            currentDate={reminderDate}
            onSelectDate={(currentDate) => {
              setReminderDate(currentDate);
            }}
          />
        )}
      </View>

      <View style={styles.bottomButton}>
        {error && <ErrorText center={true}>{error}</ErrorText>}
        <VerticalMargin />
        <TouchableOpacity
          style={styles.saveTodoButton}
          onPress={() => {
            saveTodoItem();
          }}>
          <ButtonText>{'Save'}</ButtonText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  textContainer: {
    padding: 15,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#175E77',
    padding: 10,
    justifyContent: 'space-between',
  },
  titleText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  bodyText: {
    color: 'black',
    fontSize: 17,
    lineHeight: 25,
    padding: 5,
    maxHeight: 300,
    overflow: 'visible',
    textAlignVertical: 'top',
  },
  toggleContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  toggleText: {
    color: 'grey',
    fontSize: 17,
    lineHeight: 25,
    marginLeft: 15,
    fontStyle: 'italic',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: '100%',
  },
  saveTodoButton: {
    padding: 15,
    backgroundColor: 'green',
    textAlign: 'center',
    width: '100%',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

TodoDetails.propTypes = {
  item: PropTypes.object,
  deleteTodo: PropTypes.func,
  updateTodo: PropTypes.func,
};

export default TodoDetails;
