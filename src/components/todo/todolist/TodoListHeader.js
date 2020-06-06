import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Header} from '../../common/Header';

export const TodoListHeader = ({
  onPressAddButton,
  onPressLogoutButton,
  onPressInfoButton,
}) => {
  return (
    <Header>
      <View style={styles.headerIconContainer}>
        <Icon
          name="add-circle-outline"
          size={25}
          color="#fff"
          onPress={onPressAddButton}
        />
        <View style={styles.rightIcon}>
          <Icon
            name="info-outline"
            size={25}
            color="#fff"
            onPress={onPressInfoButton}
          />
        </View>
        <View style={styles.rightIcon}>
          <Icon
            name="exit-to-app"
            size={25}
            color="#fff"
            onPress={onPressLogoutButton}
          />
        </View>
      </View>
    </Header>
  );
};

const styles = StyleSheet.create({
  headerIconContainer: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 5,
  },
  rightIcon: {
    marginLeft: 25,
  },
});

TodoListHeader.propTypes = {
  onPressAddButton: PropTypes.func.isRequired,
  onPressLogoutButton: PropTypes.func.isRequired,
  onPressInfoButton: PropTypes.func.isRequired,
};

TodoListHeader.defaultProps = {
  onPressAddButton: () => {},
  onPressLogoutButton: () => {},
  onPressInfoButton: () => {},
};
