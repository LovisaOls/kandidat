const initState = {};

const scheduleReducer = (state = initState, action) => {
     switch(action.type){
        case 'FETCH_EVENTS':
            return action.scheduleEvents;
        default: 
            return state;
    }
};

export default scheduleReducer;