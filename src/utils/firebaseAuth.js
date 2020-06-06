import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {AuthErrors, ErrorMessages} from './constants';
import {getCurrentDate} from './dateTime';

// fa stands for -> Firebase Auth

/**
 * Create new Firebase Auth Account
 * @param {*} email
 * @param {*} password
 */
export const faCreateAccount = async (email, password) => {
  try {
    const data = await auth().createUserWithEmailAndPassword(email, password);
    // console.log(TAG + JSON.stringify(data));
    return {data};
  } catch (error) {
    // console.log('faCreateAccount' + error);
    if (error.code === AuthErrors.ALREADY_IN_USE) {
      return faSignInWithEmailPassword(email, password);
    } else {
      return faHandleError(error);
    }
  }
};

/**
 * Perform Firebase login with Email and Password
 * @param {*} email
 * @param {*} password
 */
const faSignInWithEmailPassword = async (email, password) => {
  try {
    const data = await auth().signInWithEmailAndPassword(email, password);
    // console.log(TAG + JSON.stringify(data));
    return {data};
  } catch (error) {
    // console.log('faSignInWithEmailPassword' + error);
    return faHandleError(error);
  }
};

/**
 * Sign out from Firebase Auth
 */
export const faSignOut = async () => {
  return auth()
    .signOut()
    .then(() => {
      return {success: true};
    })
    .catch((error) => {
      return {success: false};
    });
};

/**
 * Get currently logged in user from Firebase Auth
 */
export const faGetCurrentUser = async () => {
  return auth().currentUser;
};

/**
 * Sign in to Firebase via Facebook SDK
 */
export const faSignInWithFacebook = async () => {
  const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
  const fbAuthResult = await LoginManager.logInWithPermissions(
    FACEBOOK_PERMISSIONS,
  );
  if (fbAuthResult.isCancelled) {
    return {error: 'Cancelled Login'};
  }
  const {accessToken} = await AccessToken.getCurrentAccessToken();
  const credentials = await auth.FacebookAuthProvider.credential(accessToken);
  try {
    const signInResult = await auth().signInWithCredential(credentials);
    return signInResult;
  } catch (error) {
    return faHandleError(error);
  }
};

/**
 * Create new User in Firestore Data
 * @param {*} userAuth
 * @param {*} additionalData
 */
export const faCreateUserProfile = async (userAuth, additionalData) => {
  // when user signs out -> do nothing
  if (!userAuth) {
    return;
  }

  // query firestore for the User document
  const userRef = firestore().doc(`users/${userAuth.uid}`);

  // represents any data in the firestore for this user (using uid)
  const snapShot = await userRef.get();

  // if we don't have any data in the firestore, we create it and save it to firestore
  if (!snapShot.exists) {
    const {email} = userAuth;
    const createdAt = getCurrentDate();
    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      // console.log('error creating user', error.message);
    }
  }

  return userRef;
};

/**
 * Handle Auth Errors
 * @param {*} error
 */
export const faHandleError = (error) => {
  console.log('faHandleError : ' + error.message);
  const {code} = error;
  switch (code) {
    case AuthErrors.INVALID_EMAIL:
      return {error: ErrorMessages.INVALID_EMAIL};
    case AuthErrors.WEAK_PASSWORD:
      return {error: ErrorMessages.WEAK_PASSWORD};
    case AuthErrors.ACCOUNT_EXISTS_DIFFERENT_CREDENTIALS:
      return {error: ErrorMessages.ACCOUNT_EXISTS_DIFFERENT_CREDENTIALS};
    default:
      return {error: ErrorMessages.WRONG_PASSWORD};
  }
};
