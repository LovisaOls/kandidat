const initState = {
    activePost: {}
};

const feedReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_FEED':
            return { ...state, feedPosts: action.feedPosts};
        case 'SET_ACTIVE_POST':
            return { ...state, activePost: action.activePost };
        default:
            return state;
    }
};

export default feedReducer;