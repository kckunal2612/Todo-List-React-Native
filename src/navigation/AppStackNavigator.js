import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TodoListPage from '../screens/TodoListPage';

const AppStack = createStackNavigator({Home: TodoListPage});
