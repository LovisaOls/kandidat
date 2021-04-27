import { combineReducers } from "redux";
import userReducer from "./user";
import teamReducer from "./team";
import feedReducer from "./feed";
import scheduleReducer from "./schedule"

export const rootReducer = combineReducers({
  currentUser: userReducer,
  currentTeams: teamReducer,
  feedPosts: feedReducer,
  scheduleEvents: scheduleReducer,
});

export default rootReducer;
