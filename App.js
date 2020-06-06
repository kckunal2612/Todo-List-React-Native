/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {faCreateUserProfile} from './src/utils/firebaseAuth';
import AppNavigator from './src/navigation/AppNavigator';
import {setAppUser} from './src/redux/actions/userActions';
import {showCurrentScreen} from './src/utils/navigationAnalytics';
import {setupPushNotifications} from './src/utils/pushNotifications';

const App = (props) => {
  const {setUser} = props;

  useEffect(() => {
    setupPushNotifications();
    const authStateListener = auth().onAuthStateChanged(onAuthStateChanged);
    return authStateListener; // unsubscribe on unmount
  }, []);

  async function onAuthStateChanged(userAuth) {
    if (userAuth) {
      const userRef = await faCreateUserProfile(userAuth);
      // update user in state whenever snapshot changes (realtime)
      userRef.onSnapshot((snapShot) => {
        setUser({
          uid: snapShot.id,
          ...snapShot.data(),
        });
      });
      // also update user in state after authentication
      setUser(userAuth);
    } else {
      // Set user to NULL when user logs out
      setUser(userAuth);
    }
  }

  return (
    <AppNavigator
      onNavigationStateChange={(prevState, currentState, action) =>
        showCurrentScreen(currentState, prevState)
      }
    />
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  const {user} = state;
  return {...user};
};

const mapDispatchToProps = {
  setUser: setAppUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
