const initState = {};

const feedReducer = (state = initState, action) => {
     switch(action.type){
        case 'FETCH_FEED':
            return action.feedPosts;
        default: 
            return state;
    }
};

export default feedReducer;