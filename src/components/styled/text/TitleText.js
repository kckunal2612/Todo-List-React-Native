import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export const TitleText = (props) => {
  const extraStyle = props.center ? {textAlign: 'center'} : {};
  return (
    <Text numberOfLines={props.maxLines} style={[styles.text, extraStyle]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

TitleText.propTypes = {
  maxLines: PropTypes.number,
};

TitleText.defaultProps = {
  maxLines: null,
};
