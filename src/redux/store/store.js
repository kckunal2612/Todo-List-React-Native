import {createStore, applyMiddleware, combineReducers} from 'redux';
import appReducer from '../reducers/appReducer';
import authReducer from '../reducers/authReducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({user: appReducer, auth: authReducer});
export const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
