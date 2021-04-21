const teamReducer = (state = null, action) => {
     switch(action.type){
        case "TEAM_CHOSEN":
            console.log('teamChosen', action.currentTeam)
            return action.currentTeam;
        default: 
            return state;
    }
};


export default teamReducer;