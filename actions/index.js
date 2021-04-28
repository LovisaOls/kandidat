import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import { Alert } from "react-native";

import { Actions } from "react-native-router-flux";
//Kallas i welcome screen - loggar in en användare med email och password
export const signIn = (email, password) => {
  return (dispatch) => {
    //Make async call to database
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        // Signed in
        firebase
          .database()
          .ref(`/users/${response.user.uid}`)
          .on("value", (snapshot) => {
            dispatch({ type: "SET_CURRENT_USER", currentUser: snapshot.val() });
          });
        Actions.Profile();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`error code: ${errorCode}`);
        //alert(`error message: ${errorMessage}`);
      });
  };
};

//Kallas i loading screen - sätter current user givet att man har ett userID authenticated
export const setCurrentUser = (userId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${userId}`)
      .on("value", (snapshot) => {
        dispatch({ type: "SET_CURRENT_USER", currentUser: snapshot.val() });
      });
    Actions.Profile();
  };
};

//Lägg till ny användare i db
export const registerUser = (email, password, firstName, lastName) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        firebase
          .database()
          .ref(`/users/${response.user.uid}`)
          .set({
            id: response.user.uid,
            email: email,
            firstName: firstName,
            lastName: lastName,
          })
          .then(() => {
            firebase
              .database()
              .ref(`/users/${response.user.uid}`)
              .on("value", (snapshot) => {
                dispatch({
                  type: "SET_CURRENT_USER",
                  currentUser: snapshot.val(),
                });
              });
            Actions.Profile();
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
};

//Lägg till nytt lag i db
export const registerTeam = (userId, teamName, city) => {
  return (dispatch) => {
    const teamRef = firebase.database().ref("/teams/").push();
    const teamKey = teamRef.key;
    teamRef
      .set({
        teamId: teamKey,
        teamName: teamName,
        city: city,
        coach: userId,
        members: {},
      })
      .then(
        //lägger in userId som member i laget
        firebase
          .database()
          .ref(`/teams/${teamKey}/members/`)
          .child(userId)
          .set(true)
      )
      .then(() => {
        //Lägger in lagId hos user
        firebase
          .database()
          .ref(`/users/${userId}/teams/`)
          .child(teamKey)
          .set(true);
        dispatch({ type: "ADD_TEAM" });
        Actions.Profile();
      });
  };
};

//Denna funktion är problematisk för den lyssnar inte på en plats i databasen, utan hämtar in manuellt.
//Hade varit trevligt om man kunde designa databasen sådan att man hade möjlighet att göra en query. Men vet ej hur.
export const fetchUserTeams = (userId) => {
  return (dispatch) => {
    let teamIds = {};
    firebase
      .database()
      .ref(`/users/${userId}/teams`)
      .on("value", (snapshot) => {
        teamIds = snapshot.val();
      });
    let userTeams = [];
    if (teamIds) {
      {
        Object.keys(teamIds).map((teamId) => {
          firebase
            .database()
            .ref(`/teams/${teamId}`)
            .on("value", (snapshot) => {
              if (snapshot.exists) {
                const team = snapshot.val();
                userTeams.push(team);
              } else {
                console.log("No data available");
              }
            });
        });
      }
    }
    dispatch({ type: "FETCH_TEAMS", userTeams: userTeams });
  };
};

export const joinTeam = (userId, teamId) => {
  return (dispatch) => {
    var validTeam = false;
    var ref = firebase.database().ref("/teams/");
    ref.once("value").then(function (snapshot) {
      if (snapshot.child(teamId).exists()) {
        validTeam = true;
      } else {
        Alert.alert("Invalid TeamId");
      }
    });
    if (validTeam) {
      firebase
        .database()
        .ref(`/teams/${teamId}/members/`)
        .child(userId)
        .set(true);
      firebase
        .database()
        .ref(`/users/${userId}/teams/`)
        .child(teamId)
        .set(true);
      Actions.Profile();
    }
  };
};

export const setActiveTeam = (teamId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref(`/teams/${teamId}`)
      .on("value", (snapshot) => {
        dispatch({ type: "SET_ACTIVE_TEAM", activeTeam: snapshot.val() });
      });
    Actions.BottomMenu();
  };
};

export const fetchFeed = (teamId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/feed/")
      .orderByChild("teamId")
      .equalTo(teamId)
      .on("value", (snapshot) => {
        dispatch({ type: "FETCH_FEED", feedPosts: snapshot.val() });
      });
  };
};

export const fetchEvents = (teamId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/events/")
      .orderByChild("teamId")
      .equalTo(teamId)
      .on("value", (snapshot) => {
        dispatch({ type: "FETCH_EVENTS", scheduleEvents: snapshot.val() });
      });
  };
};

export const fetchTeamMembers = (teamId) => {
  return (dispatch) => {
    let teamMemberIds = [];
    firebase
      .database()
      .ref(`/teams/${teamId}/members`)
      .on("value", (snapshot) => {
        teamMemberIds = Object.keys(snapshot.val());
      });
    console.log("teamMemberIds:", teamMemberIds);

    let teamMembers = [];
    teamMemberIds.forEach((userId) => {
      firebase
        .database()
        .ref(`/users/${userId}`)
        .on("value", (snapshot) => {
          if (snapshot.exists) {
            const member = snapshot.val();
            teamMembers.push(member);
          } else {
            console.log("No data available");
          }
        });
    });
    dispatch({ type: "FETCH_TEAMMEMBERS", teamMembers: teamMembers });
  };
};
