import {combineReducers} from "redux";
import userReducer from './user';
import teamReducer from './team';

export const rootReducer = combineReducers({
    currentUser: userReducer,
    currentTeams: teamReducer
});

export default rootReducer;