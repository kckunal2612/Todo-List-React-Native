import React, {useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {styles} from './signInPage.styles';
import {ErrorText} from '../components/styled/text/ErrorText';
import {moveToScreen} from '../utils/navigationAnalytics';
import {Routes} from '../navigation/Routes';
import SignInContainer from '../components/auth/SignInContainer';

const SignInPage = ({user, error, loading, navigation}) => {
  // Watch for 'user' state for navigation after successful sign in
  useEffect(() => {
    if (user) {
      // navigate to To-do Page when signing in for the first time
      moveToScreen(Routes.App, navigation);
    }
  }, [user, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.content}>
            <SignInContainer />
            {loading && <ActivityIndicator size="large" />}
            {error && <ErrorText center={true}>{error}</ErrorText>}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {user, auth} = state;
  return {...user, ...auth};
};

const NavigationSignInPage = withNavigation(SignInPage);
export default connect(mapStateToProps, null)(NavigationSignInPage);
