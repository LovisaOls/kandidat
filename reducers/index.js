import {combineReducers} from "redux";
import userReducer from './user';
import teamReducer from './team';
import feedReducer from './feed';

export const rootReducer = combineReducers({
    currentUser: userReducer,
<<<<<<< HEAD
    currentTeam: teamReducer,
    
=======
    currentTeams: teamReducer,
    feedPosts: feedReducer
>>>>>>> 06ca788d33a57275d0a6726e8c462c3243278c2e
});

export default rootReducer;