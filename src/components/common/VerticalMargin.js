import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

const VerticalMargin = ({type = 'medium'}) => {
  let verticalMargin = 10;
  switch (type) {
    case 'small':
      verticalMargin = 5;
      break;
    case 'medium':
      verticalMargin = 10;
      break;
    case 'large':
      verticalMargin = 15;
      break;
    case 'extraLarge':
      verticalMargin = 20;
      break;
  }

  return <View style={{height: verticalMargin}} />;
};

VerticalMargin.propTypes = {
  type: PropTypes.string,
};

export {VerticalMargin};
