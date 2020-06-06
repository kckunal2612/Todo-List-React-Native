import firestore from '@react-native-firebase/firestore';
const USER_COLLECTION = 'users';
const TODO_COLLECTION = 'todos';

export const fsLoadUser = async (userId) => {
  return await firestore().collection(USER_COLLECTION).doc(userId);
};

export const fsLoadTodoList = async (userId) => {
  return firestore()
    .collection(USER_COLLECTION)
    .doc(userId)
    .collection(TODO_COLLECTION);
};

export const fsAddTodo = async (userId, todoItem) => {
  const todoCollectionRef = await firestore()
    .collection(USER_COLLECTION)
    .doc(userId)
    .collection(TODO_COLLECTION);
  return todoCollectionRef.add(todoItem);
};

export const fsUpdateTodo = async (userId, updatedItem) => {
  const todoId = updatedItem.id;
  return await firestore()
    .collection(USER_COLLECTION)
    .doc(userId)
    .collection(TODO_COLLECTION)
    .doc(todoId)
    .update({...updatedItem});
};

export const fsDeleteTodo = async (userId, todoId) => {
  return await firestore()
    .collection(USER_COLLECTION)
    .doc(userId)
    .collection(TODO_COLLECTION)
    .doc(todoId)
    .delete();
};
