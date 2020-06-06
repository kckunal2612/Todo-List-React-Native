import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../../common/CustomButton';
import {connect} from 'react-redux';
import {startSignInAsync} from './../../../redux/actions/signInFormActions';

const EmailSignInButton = ({enabled, email, password, startSignIn}) => {
  const onButtonPress = async () => {
    if (email.length !== 0 && password.length !== 0) {
      startSignIn(email, password);
    }
  };

  return (
    <CustomButton
      onPress={() => onButtonPress()}
      backgroundColor={enabled ? 'green' : 'grey'}
      title={'Sign In or Register'}
    />
  );
};

EmailSignInButton.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  startSignIn: PropTypes.func.isRequired,
  setSignInSuccessful: PropTypes.func.isRequired,
  setSignInFailed: PropTypes.func.isRequired,
};

EmailSignInButton.defaultProps = {
  email: '',
  password: '',
  startSignIn: () => {},
  setSignInSuccessful: () => {},
  setSignInFailed: () => {},
};

const mapStateToProps = (state) => {
  const {auth} = state;
  return {...auth};
};

const mapDispatchToProps = {
  startSignIn: startSignInAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignInButton);
