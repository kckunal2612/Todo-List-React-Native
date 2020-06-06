import React from 'react';
import {View, StyleSheet} from 'react-native';
import HTML from 'react-native-render-html';
import {
  APP_ICON_ATTRIBUTION,
  ATTRIBUTION_LINK_BANNER_IMAGE,
} from '../../utils/constants';

export const AttributionContent = ({visible}) => {
  const htmlContent =
    '<h3>Banner Image Attribution</h3>' +
    ATTRIBUTION_LINK_BANNER_IMAGE +
    '<br/>' +
    '<h3>App Icon Attribution</h3>' +
    APP_ICON_ATTRIBUTION +
    '<br/>';
  return (
    <View style={styles.container}>
      <HTML html={htmlContent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
});
