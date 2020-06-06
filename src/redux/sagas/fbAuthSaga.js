import {put, takeLatest, call} from 'redux-saga/effects';
import {faSignInWithFacebook} from '../../utils/firebaseAuth';
import {
  START_SIGN_IN_ASYNC_FACEBOOK,
  BEGIN_AUTHENTICATION,
  SET_AUTHENTICATION_SUCCESSFUL,
  SET_AUTHENTICATION_FAILED,
} from '../types/types';

export function* watchFacebookSignInAsync() {
  yield takeLatest(START_SIGN_IN_ASYNC_FACEBOOK, performFacebookSignIn);
}

function* performFacebookSignIn(action) {
  try {
    yield put({type: BEGIN_AUTHENTICATION});
    const fbSignInResult = yield call(faSignInWithFacebook);
    if (fbSignInResult.error) {
      yield put({type: SET_AUTHENTICATION_FAILED, error: fbSignInResult.error});
    } else {
      yield put({type: SET_AUTHENTICATION_SUCCESSFUL});
    }
  } catch (error) {
    console.log(error);
    yield put({type: SET_AUTHENTICATION_FAILED, error});
  }
}
