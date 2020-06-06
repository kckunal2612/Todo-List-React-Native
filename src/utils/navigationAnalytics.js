// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export const showCurrentScreen = (currentState, prevState) => {
  const currentRouteName = getActiveRouteName(currentState);
  const previousRouteName = getActiveRouteName(prevState);

  if (previousRouteName !== currentRouteName) {
    // the line below uses the @react-native-firebase/analytics tracker
    // change the tracker here to use other Mobile analytics SDK.
    // console.log('Current Route Name = ' + currentRouteName);
  }
};

export const moveToScreen = (newScreenName, navigation, params = null) => {
  navigation.navigate(newScreenName, params);
};

export const goBack = (navigation) => {
  navigation.goBack();
};
