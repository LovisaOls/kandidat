const initState = {};

const userReducer = (state = initState, action) => {
     switch(action.type){
        case 'SIGN_IN':
            console.log('currentUser i reducer', action.currentUser)
            return action.currentUser;
        default: 
            return state;
    }
};

export default userReducer;