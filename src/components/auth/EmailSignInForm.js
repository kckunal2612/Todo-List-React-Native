import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormTextInput from '../common/FormTextInput';
import {VerticalMargin} from '../common/VerticalMargin';
import EmailSignInButton from './common/EmailSignInButton';

const EmailSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isSignInButtonEnabled = email.length > 0 && password.length > 0;
  const passwordIconName = passwordVisible ? 'visibility' : 'visibility-off';

  return (
    <View style={styles.container}>
      <FormTextInput
        placeholder={'Enter your email'}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <View style={styles.passwordTextInput}>
        <FormTextInput
          secureTextEntry={!passwordVisible}
          placeholder={'Enter your password'}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Icon
          name={passwordIconName}
          size={28}
          style={styles.icon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      </View>

      <View style={styles.signInButton}>
        <EmailSignInButton
          email={email}
          password={password}
          enabled={isSignInButtonEnabled}
        />
      </View>

      <VerticalMargin />
    </View>
  );
};

EmailSignInForm.propTypes = {};

export const styles = StyleSheet.create({
  container: {
    minWidth: '85%',
    maxWidth: '85%',
  },
  passwordTextInput: {
    marginTop: 15,
  },
  signInButton: {
    marginTop: 25,
  },
  icon: {
    position: 'absolute',
    top: 7,
    right: 5,
  },
  row: {
    flexDirection: 'row',
  },
});

const mapStateToProps = (state) => {
  const {auth} = state;
  return {...auth};
};

export default connect(mapStateToProps, null)(EmailSignInForm);
