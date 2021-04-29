const initState = {
  userTeams: [],
  activeTeam: {},
  teamMembers: [],
  fetchDone: false,
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
    case "ACCEPT_MEMBER":
      return state;
    case "DECLINE_MEMBER":
      return state;
    default:
      return state;
  }
};

export default teamReducer;
