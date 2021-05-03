const initState = {};

const feedReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_FEED":
      return { ...state, feedPosts: action.feedPosts };
    case " COMMENT_ADDED":
      return state;
    default:
      return state;
  }
};

export default feedReducer;
