import {hasDateAlreadyExpired} from './dateTime';

export const isTodoNonEmpty = (todoItem) => {
  const {title, description} = todoItem;
  return title && description;
};

export const sortTodoList = (todoList) => {
  const expiredReminders = [];
  const activeReminders = [];

  for (let index = 0; index < todoList.length; index++) {
    const todoItem = todoList[index];
    if (todoItem.remindDate) {
      if (hasDateAlreadyExpired(todoItem.remindDate.toDate())) {
        expiredReminders.push(todoItem);
      } else {
        activeReminders.push(todoItem);
      }
    } else {
      expiredReminders.push(todoItem);
    }
  }

  activeReminders.sort((a, b) => {
    if (a.remindDate !== null && b.remindDate !== null) {
      const reminderDate1 = a.remindDate.toDate();
      const reminderDate2 = b.remindDate.toDate();
      return reminderDate1 - reminderDate2;
    }
    return 0;
  });

  expiredReminders.sort((a, b) => {
    if (a.remindDate !== null && b.remindDate !== null) {
      const reminderDate1 = a.remindDate.toDate();
      const reminderDate2 = b.remindDate.toDate();
      return reminderDate2 - reminderDate1;
    }
    return 0;
  });

  const finalTodoList = [...activeReminders, ...expiredReminders];
  return finalTodoList;
};
