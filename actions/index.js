import "firebase/database";
require("firebase/auth");
import { Alert } from "react-native";
import * as firebase from "firebase";
import { Actions } from "react-native-router-flux";
//Kallas i welcome screen - loggar in en användare med email och password


export const signIn = (email, password) => {
  return (dispatch) => {
    //Make async call to database
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`Error: ${errorCode}`, errorMessage);
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
export const registerUser = (
  email,
  password,
  firstName,
  lastName,
  imageUrl
) => {
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
            profilePicture: imageUrl,
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
            //Actions.Profile();
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
export const registerTeam = (userId, teamName, city, url) => {
  return (dispatch) => {
    const teamRef = firebase.database().ref("/teams/").push();
    const teamKey = teamRef.key;
    teamRef
      .set({
        teamId: teamKey,
        teamName: teamName,
        city: city,
        members: {},
        teamPicture: url,
      })
      .then(
        //lägger in userId som member i laget
        firebase
          .database()
          .ref(`/teams/${teamKey}/members/`)
          .child(userId)
          .set("coach")
      )
      .then(() => {
        //Lägger in lagId hos user
        firebase
          .database()
          .ref(`/users/${userId}/teams/`)
          .child(teamKey)
          .set("coach");
        dispatch({ type: "ADD_TEAM" });
        Actions.Profile();
      });
  };
};

export const fetchUserTeams = (userId) => {
  return (dispatch) => {
    let userTeams;
    firebase
      .database()
      .ref("/teams/")
      .on("value", (snapshot) => {
        userTeams = [];
        snapshot.forEach((team) => {
          for (let id in team.val().members) {
            if (userId === id) {
              let tempObject = team.val();
              tempObject.key = team.key;
              userTeams.push(tempObject);
            }
          }
        });
        dispatch({ type: "FETCH_TEAMS", userTeams: userTeams });
      });
  };
};

export const joinTeam = (userId, teamId) => {
  return (dispatch) => {
    var ref = firebase.database().ref(`/teams/${teamId}`);
    ref.once("value").then(function (snapshot) {
      if (snapshot.val() !== null) {
        firebase
          .database()
          .ref(`/teams/${teamId}/members/`)
          .child(userId)
          .set(false);
        firebase
          .database()
          .ref(`/users/${userId}/teams/`)
          .child(teamId)
          .set(false);
        Actions.Profile();
      } else {
        Alert.alert(
          "Invalid TeamId",
          "Make sure you have entered a valid teamId"
        );
      }
    });
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

export const fetchTeamMembers = (teamId) => {
  return (dispatch) => {
    let teamMembers;
    firebase
      .database()
      .ref("/users/")
      .on("value", (snapshot) => {
        teamMembers = [];
        snapshot.forEach((user) => {
          for (let id in user.val().teams) {
            if (teamId === id) {
              let tempObject = user.val();
              tempObject.key = user.key;
              teamMembers.push(tempObject);
            }
          }
        });
        dispatch({ type: "FETCH_TEAMMEMBERS", teamMembers: teamMembers });
      });
  };
};

export const fetchAllTeams = () => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/teams/")
      .on("value", (snapshot) => {
        dispatch({ type: "FETCH_ALL_TEAMS", allTeams: snapshot.val() });
      });
  };
};

export const updateUser = (userId, url) => {
  return () => {
    firebase
      .database()
      .ref(`/users/${userId}`)
      .child(`profilePicture`)
      .set(url);
  };
};

