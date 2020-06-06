import {all} from 'redux-saga/effects';
import {helloSaga, watchIncrementAsync} from './todoListSaga';
import {watchEmailSignInAsync} from './emailSignInSaga';
import {watchFacebookSignInAsync} from './fbAuthSaga';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchEmailSignInAsync(),
    watchFacebookSignInAsync(),
  ]);
}
