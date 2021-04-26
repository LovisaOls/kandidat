import { combineReducers } from "redux";
import userReducer from "./user";
import teamReducer from "./team";
import feedReducer from "./feed";

export const rootReducer = combineReducers({
  currentUser: userReducer,
  currentTeams: teamReducer,
  feedPosts: feedReducer,
});

export default rootReducer;
