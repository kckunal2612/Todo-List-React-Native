import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export const BodyText = (props) => {
  const centerStyle = props.center ? {textAlign: 'center'} : {};
  const otherStyle = props.style ? {...props.style} : {};
  const extraStyle = {...centerStyle, ...otherStyle};

  return (
    <Text numberOfLines={props.maxLines} style={[styles.text, extraStyle]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 15,
  },
});

BodyText.propTypes = {};
