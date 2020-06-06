import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

export const CustomButton = (props) => {
  return (
    <View style={{...styles.container, backgroundColor: props.backgroundColor}}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles.customButtonTitle}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
  },
  customButtonTitle: {
    color: 'white',
    textAlign: 'center',
  },
});

CustomButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

CustomButton.defaultProps = {
  title: '',
  onPress: () => {},
};

export default CustomButton;
