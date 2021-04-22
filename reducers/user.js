const initState = {};

const userReducer = (state = initState, action) => {
     switch(action.type){
        case 'SIGN_IN':
            return action.currentUser;
        default: 
            return state;
    }
};

export default userReducer;