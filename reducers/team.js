const initState = {
  userTeams: [],
  activeTeam: {},
  teamMembers: [],
  allTeams: {},
};

const teamReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TEAM":
      return state;
    case "FETCH_TEAMS":
      return { ...state, userTeams: action.userTeams };
    case "SET_ACTIVE_TEAM":
      return { ...state, activeTeam: action.activeTeam };
    case "FETCH_TEAMMEMBERS":
      return { ...state, teamMembers: action.teamMembers };
    case "FETCH_ALL_TEAMS":
      return { ...state, allTeams: action.allTeams };
    default:
      return state;
  }
};

export default teamReducer;
