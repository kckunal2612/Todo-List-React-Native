import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';

const FormTextInput = (props) => {
  return <TextInput {...props} style={styles.textInput} />;
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderBottomWidth: 1,
  },
});

FormTextInput.propTypes = {};

export default FormTextInput;
