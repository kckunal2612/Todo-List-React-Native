import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

export const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{props.title}</Text>
      <View>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#175E77',
    padding: 15,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: 'white',
    fontSize: 17,
  },
});

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: '',
};

export default Header;
