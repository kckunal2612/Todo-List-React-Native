import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export const ButtonText = (props) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

ButtonText.propTypes = {};
