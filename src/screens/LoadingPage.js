import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {withNavigation} from 'react-navigation';
import {faGetCurrentUser} from '../utils/firebaseAuth';
import {moveToScreen} from '../utils/navigationAnalytics';
import {Routes} from '../navigation/Routes';

const LoadingPage = ({navigation}) => {
  useEffect(() => {
    redirectFromAuthState();
  }, []);

  const redirectFromAuthState = async () => {
    setTimeout(async () => {
      const currentUser = await faGetCurrentUser();
      // navigate to appropriate screen based on user auth state
      if (!currentUser) {
        // navigate to Sign In Page
        moveToScreen(Routes.Auth, navigation);
      } else {
        // navigate to Todo Page
        moveToScreen(Routes.App, navigation);
      }
    }, 400);
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withNavigation(LoadingPage);
