import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {VerticalMargin} from '../common/VerticalMargin';
import FadeInView from '../common/FadeInView';
import EmailSignInForm from './EmailSignInForm';
import {BodyText} from '../styled/text/BodyText';
import FacebookLoginButton from './common/FacebookSignInButton';
import {LinkText} from '../styled/text/LinkText';
import {BANNER_IMAGE} from '../../images';

const SignInContainer = () => {
  return (
    <View style={styles.content}>
      <Image
        style={styles.bannerImage}
        resizeMode="contain"
        source={BANNER_IMAGE}
      />

      <VerticalMargin />

      <FadeInView duration={1000}>
        <EmailSignInForm />
        <View>
          <BodyText center={true}>{'OR'}</BodyText>
          <VerticalMargin />
          <FacebookLoginButton />
        </View>
      </FadeInView>

      <VerticalMargin type="extraLarge" />

      <BodyText>{'By signing in, you agree to our'}</BodyText>

      <LinkText onLinkPress={() => {}}>{' Terms and Conditions'}</LinkText>
    </View>
  );
};

SignInContainer.propTypes = {};

export const styles = StyleSheet.create({
  container: {
    minWidth: '85%',
    maxWidth: '85%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
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
  bannerImage: {
    height: 250,
    width: 350,
  },
});

const mapStateToProps = (state) => {
  const {auth} = state;
  return {...auth};
};

export default connect(mapStateToProps, null)(SignInContainer);
