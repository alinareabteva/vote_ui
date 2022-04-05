import {combineReducers} from 'redux';
import {authReducer} from './auth-reducer';
import {candidateReducer} from "./candidate-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  candidates: candidateReducer,
});

export default rootReducer;
