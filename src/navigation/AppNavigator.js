import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingPage from '../screens/LoadingPage';
import TodoListPage from '../screens/TodoListPage';
import SignInPage from '../screens/SignInPage';
import TodoDetails from '../screens/TodoDetails';

const AppStack = createStackNavigator(
  {Home: TodoListPage, TodoDetail: TodoDetails},

  {headerMode: 'none'},
);
const AuthStack = createStackNavigator(
  {SignIn: SignInPage},
  {headerMode: 'none'},
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingPage,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
