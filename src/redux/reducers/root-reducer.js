import {combineReducers} from 'redux';
import {authReducer} from './auth-reducer';
import {candidateReducer} from "./candidate-reducer";
import {electionReducer} from "./election-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  candidates: candidateReducer,
  elections: electionReducer
});

export default rootReducer;
