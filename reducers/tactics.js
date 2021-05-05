const initState = {};

const tacticsReducer = (state = initState, action) => {
     switch(action.type){
        case 'FETCH_TACTICS':
            return action.lineUpTactics;
        default: 
            return state;
    }
};

export default tacticsReducer;