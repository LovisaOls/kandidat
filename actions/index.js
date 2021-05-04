import "firebase/database";
require("firebase/auth");
import { Alert } from "react-native";
import * as firebase from "firebase";

import { Actions } from "react-native-router-flux";
//Kallas i welcome screen - loggar in en användare med email och password
export const signIn = (email, password) => {
  return (dispatch) => {
    //Make async call to database
    firebase.auth().signInWithEmailAndPassword(email, password);
    /* .then((response) => {
        // Signed in
        firebase
          .database()
          .ref(`/users/${response.user.uid}`)
          .on("value", (snapshot) => {
            dispatch({ type: "SET_CURRENT_USER", currentUser: snapshot.val() });
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`error code: ${errorCode}`);
        //alert(`error message: ${errorMessage}`);
      }); */
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

/*
    if (teamIds) {
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
    console.log("lagen i action", userTeams);
    dispatch({ type: "FETCH_TEAMS", userTeams: userTeams }); */
//};

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
        Alert.alert("Invalid TeamId");
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
export const acceptMember = (userId, teamId) => {
  return (dispatch) => {
    var updates = {};
    updates[`/users/${userId}/teams/${teamId}`] = true;
    updates[`/teams/${teamId}/members/${userId}`] = true;
    firebase.database().ref().update(updates);
    dispatch({ type: "ACCEPT_MEMBER" });
  };
};

export const declineMember = (userId, teamId) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${userId}/teams/${teamId}`).remove();
    firebase.database().ref(`/teams/${teamId}/members/${userId}`).remove();
    dispatch({ type: "DECLINE_MEMBER" });
  };
};

// Här skapas en kommentar till en post
export const createComment = (postId, commentText, firstname, lastname) => {
  return (dispatch) => {
    const commentRef = firebase
      .database()
      .ref(`/feed/${postId}/comments/`)
      .push();
    commentRef.set({
      author: firstname + " " + lastname,
      text: commentText,
    });
    dispatch({ type: "COMMENT_ADDED" });
  };
};

// User likes a post
export const like = (postId, userId) => {
  return (dispatch) => {
    const likesRef = firebase.database().ref(`/feed/${postId}/likes/`).child(userId).set(true);
  };
};

// Remove like from post
export const removeLike = (postId, userId) => {
  return (dispatch) => {
    firebase.database().ref(`/feed/${postId}/likes/${userId}`).remove();
    // dispatch({ type: "DECLINE_MEMBER" });
  };
};
