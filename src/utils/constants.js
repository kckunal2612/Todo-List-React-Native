export const ATTRIBUTION_LINK_BANNER_IMAGE =
  '<a href="https://www.freepik.com/free-photos-vectors/people">People vector created by pch.vector - www.freepik.com</a>';

export const APP_ICON_ATTRIBUTION =
  '<div>Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>';

export const EMPTY_IMAGE_ATTRIBUTION = 'https://icons8.com';

export const AuthErrors = {
  ALREADY_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  WRONG_PASSWORD: 'auth/wrong-password',
  WEAK_PASSWORD: 'auth/weak-password',
  ACCOUNT_EXISTS_DIFFERENT_CREDENTIALS:
    'auth/account-exists-with-different-credential',
};

export const ErrorMessages = {
  ALREADY_IN_USE: 'Email is already in use',
  INVALID_EMAIL: 'Email or password invalid',
  WRONG_PASSWORD: 'Incorrect password entered',
  WEAK_PASSWORD: 'Password should be at least 6 characters',
  ACCOUNT_EXISTS_DIFFERENT_CREDENTIALS:
    'Account already exists with different credentials.',
};

export const TodoErrors = {
  EXPIRED_TIME: 'Cannot set reminder for time that has passed',
  EMPTY_CONTENT: 'Title and Description cannot be blank',
};

export const TodoDeleteAlert = {
  title: 'Confirm Deletion',
  message:
    'Are you sure you want to delete this note ? This operation cannot be undone',
};

export const SignOutAlert = {
  title: 'Confirm logout',
  message: 'Are you sure you want to sign out ?',
};

export const TodoDetailsPageMode = {
  NEW: 'add',
  EDIT: 'edit',
};
