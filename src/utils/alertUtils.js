import {Alert} from 'react-native';
export const showAlert = (
  title,
  message,
  onPressOk = () => {},
  onPressCancel = () => {},
  cancelable,
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        onPress: () => onPressCancel(),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => onPressOk(),
      },
    ],
    {cancelable: cancelable},
  );
};
