const initState = {};

const feedReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_FEED':
            return { ...state, feedPosts: action.feedPosts};
        default:
            return state;
    }
};

export default feedReducer;