import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export const ErrorText = (props) => {
  const extraStyle = props.center ? {textAlign: 'center'} : {};
  return <Text style={[styles.text, extraStyle]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 14,
  },
});

ErrorText.propTypes = {};
