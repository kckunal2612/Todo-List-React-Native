import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {VerticalMargin} from '../components/common/VerticalMargin';
import {TodoListItem} from '../components/todo/todolist/TodoListItem';
import {TodoListHeader} from '../components/todo/todolist/TodoListHeader';
import Modal from 'react-native-modal';
import {faSignOut, faGetCurrentUser} from '../utils/firebaseAuth';
import {
  fsLoadTodoList,
  fsUpdateTodo,
  fsDeleteTodo,
  fsAddTodo,
} from '../utils/firestoreUtils';
import {setAppUser, clearUser} from '../redux/actions/userActions';
import {moveToScreen} from '../utils/navigationAnalytics';
import {Routes} from '../navigation/Routes';
import {showAlert} from '../utils/alertUtils';
import {clearReminders, scheduleReminder} from '../utils/pushNotifications';
import FadeInView from '../components/common/FadeInView';
import {sortTodoList} from '../utils/todoListUtils';
import {TodoDetailsPageMode, SignOutAlert} from '../utils/constants';
import {AttributionContent} from '../components/attribution/AttributionContent';

const TodoListPage = ({user, resetUser, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    loadTodoList();
  }, []);

  const loadTodoList = async () => {
    const currentUser = await faGetCurrentUser();
    const todoCollectionRef = await fsLoadTodoList(currentUser.uid);
    // We'll also monitor the Todo Collection for Realtime Changes
    todoCollectionRef.onSnapshot(onTodosFetched, onTodoFetchError);
  };

  const onTodosFetched = async (querySnapshot) => {
    clearReminders();
    const todoList = populateTodoList(querySnapshot);
    const sortedTodoList = sortTodoList(todoList);
    scheduleTodoReminders(sortedTodoList);
    setTodos(sortedTodoList);
  };

  const onTodoFetchError = (error) => {
    // console.error(error);
  };

  /**
   * Fetch data from user's todo collection and process it
   * @param {*} querySnapshot
   */
  const populateTodoList = (querySnapshot) => {
    const todoList = [];
    querySnapshot.forEach((snapshot) => {
      const todoId = snapshot.ref.id ? snapshot.ref.id : Math.random();
      const {description, title, createdAt, remindDate} = snapshot.data();
      const todoItem = {
        id: todoId,
        title,
        description,
        remindDate: remindDate ? remindDate : null,
        createdAt,
      };
      todoList.push(todoItem);
    });
    return todoList;
  };

  const scheduleTodoReminders = (todoList) => {
    for (const todo of todoList) {
      if (todo.remindDate) {
        const {title, description, remindDate} = todo;
        scheduleReminder(title, description, remindDate);
      }
    }
  };

  /**
   * Update Existing todo List item
   * @param {*} updatedItem
   */
  const updateTodo = async (updatedItem) => {
    setLoading(true);
    fsUpdateTodo(user.uid, updatedItem)
      .then(() => {
        setLoading(false);
        // console.log('Document Updated');
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  /**
   * Delete a Todo List Item
   * @param {*} todoId
   */
  const deleteTodo = async (todoId) => {
    setLoading(true);
    // console.log('deleteTodo(' + todoId + ')');
    fsDeleteTodo(user.uid, todoId)
      .then(() => {
        setLoading(false);
        // console.log('Document Deleted !');
      })
      .catch((error) => {
        setLoading(false);
        // console.error(error);
      });
  };

  /**
   * Open screen to EDIT Todo Item details
   */
  const showTodoDetails = (item) => {
    moveToScreen(Routes.TodoDetail, navigation, {
      pageMode: TodoDetailsPageMode.EDIT,
      item,
      updateTodo,
      deleteTodo,
    });
  };

  /**
   * Open a new screen to add a Todo Item
   */
  const openNewTodoModal = () => {
    moveToScreen(Routes.TodoDetail, navigation, {
      pageMode: TodoDetailsPageMode.NEW,
      addTodo,
    });
  };

  /**
   * Create a new Todo and save it to Firestore
   * @param {*} todoItem
   */
  const addTodo = async (todoItem) => {
    // console.log('Add Todo : ' + JSON.stringify(todoItem));
    setLoading(true);
    fsAddTodo(user.uid, todoItem)
      .then(() => {
        setLoading(false);
        // console.log('Todo Created !');
      })
      .catch((e) => {
        setLoading(false);
        // console.error(e);
      });
  };

  const onPressSignOut = async () => {
    showAlert(
      SignOutAlert.title,
      SignOutAlert.message,
      async () => {
        const {success} = await faSignOut();
        resetUser();
        if (success) {
          clearReminders();
          moveToScreen(Routes.Auth, navigation);
        }
      },
      () => {},
      false,
    );
  };

  const toggleAttributionModal = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TodoListHeader
          onPressAddButton={openNewTodoModal}
          onPressLogoutButton={onPressSignOut}
          onPressInfoButton={toggleAttributionModal}
        />
        <FadeInView duration={500}>
          {todos.length > 0 && (
            <View style={styles.listContainer}>
              <FlatList
                refreshing={loading}
                data={todos}
                extraData={todos}
                numColumns={2}
                keyExtractor={(item) => item.id + ''}
                renderItem={({item, index}) => (
                  <TodoListItem
                    item={item}
                    index={index}
                    showTodoDetails={showTodoDetails}
                  />
                )}
              />
            </View>
          )}
          <Modal
            useNativeDriver={true}
            isVisible={infoVisible}
            onBackdropPress={toggleAttributionModal}>
            <AttributionContent />
          </Modal>

          {todos.length === 0 && (
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyText}>
                {'Click the + icon to add notes'}
              </Text>
            </View>
          )}
        </FadeInView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  listContainer: {
    paddingBottom: 56,
  },
  emptyTextContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'grey',
  },
});

TodoListPage.propTypes = {
  user: PropTypes.object,
};

TodoListPage.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => {
  const {user} = state;
  return {...user};
};

const mapDispatchToProps = {
  setUser: setAppUser,
  resetUser: clearUser,
};

const NavigationTodoPage = withNavigation(TodoListPage);
export default connect(mapStateToProps, mapDispatchToProps)(NavigationTodoPage);
