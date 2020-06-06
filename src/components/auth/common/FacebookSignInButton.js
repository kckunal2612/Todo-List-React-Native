import React from 'react';
import {connect} from 'react-redux';
import {startFacebookSignInAsync} from '../../../redux/actions/signInFormActions';
import CustomButton from '../../common/CustomButton';
const CONTINUE_WITH_FACEBOOK_BUTTON_TEXT = 'Sign in with Facebook';

const FacebookLoginButton = ({startFacebookSignIn}) => {
  return (
    <CustomButton
      onPress={startFacebookSignIn}
      backgroundColor={'#4267B2'}
      title={CONTINUE_WITH_FACEBOOK_BUTTON_TEXT}
    />
  );
};

const mapStateToProps = (state) => {
  const {auth} = state;
  return {...auth};
};

const mapDispatchToProps = {
  startFacebookSignIn: startFacebookSignInAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacebookLoginButton);
