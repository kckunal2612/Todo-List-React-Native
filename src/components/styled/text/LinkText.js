import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export const LinkText = (props) => {
  const extraStyle = props.center ? {textAlign: 'center'} : {};
  return (
    <TouchableOpacity onPress={props.onLinkPress}>
      <Text numberOfLines={props.maxLines} style={[styles.text, extraStyle]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#4267B2',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

LinkText.propTypes = {
  onLinkPress: PropTypes.func.isRequired,
};
