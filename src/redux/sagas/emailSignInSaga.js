import {put, takeLatest, call} from 'redux-saga/effects';
import {faCreateAccount} from '../../utils/firebaseAuth';
import {
  START_SIGN_IN_ASYNC,
  BEGIN_AUTHENTICATION,
  SET_AUTHENTICATION_SUCCESSFUL,
  SET_AUTHENTICATION_FAILED,
} from '../types/types';

export function* watchEmailSignInAsync() {
  yield takeLatest(START_SIGN_IN_ASYNC, performEmailSignIn);
}

function* performEmailSignIn(action) {
  yield put({type: BEGIN_AUTHENTICATION});
  try {
    const {email, password} = action;
    if (email && password) {
      const signInResult = yield call(faCreateAccount, email, password);
      if (signInResult.error) {
        yield put({type: SET_AUTHENTICATION_FAILED, error: signInResult.error});
      } else {
        yield put({type: SET_AUTHENTICATION_SUCCESSFUL});
      }
    } else {
      yield put({
        type: SET_AUTHENTICATION_FAILED,
        error: 'Email or Password missing',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({type: SET_AUTHENTICATION_FAILED, error});
  }
}
