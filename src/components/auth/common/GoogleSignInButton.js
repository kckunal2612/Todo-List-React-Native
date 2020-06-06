import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const TAG = 'GoogleSignInButton';

const GoogleSignInButton = (props) => {
  useEffect(() => {
    GoogleSignin.configure({
      // Replace with your webClientId generated from Firebase console
      webClientId:
        '41052909432-ccl00m1rsfs8p23r4svv288pm082tgsj.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log(TAG, JSON.stringify(userInfo));
      // this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // console.log(TAG, 'SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        // console.log(TAG, 'IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        // console.log(TAG, 'PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        // some other error happened
        // console.log(TAG, JSON.stringify(error));
      }
    }
  };
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={signIn}
    />
  );
};

GoogleSignInButton.propTypes = {};

export default GoogleSignInButton;
