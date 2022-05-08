import {combineReducers} from 'redux';
import {authReducer} from './auth-reducer';
import {candidateReducer} from "./candidate-reducer";
import {electionReducer} from "./election-reducer";
import {votingReducer} from "./voting-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  candidates: candidateReducer,
  elections: electionReducer,
  voting: votingReducer
});

export default rootReducer;
