import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

import { Actions } from 'react-native-router-flux'; 

export const signIn = (email, password) => {
    return (dispatch) => {
        //Make async call to database 
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                // Signed in
                firebase.database().ref('/users/'+response.user.uid).on('value', snapshot => {
                    dispatch({ type: 'SIGN_IN', currentUser: snapshot.val()})
                })
                Actions.profile();
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(`error code: ${errorCode}`);
                //alert(`error message: ${errorMessage}`);
            });
    };
};

export const setCurrentUser = (userId) => {
    return (dispatch) => {
        firebase.database().ref('/users/'+ userId).on('value', snapshot => {
            dispatch({ type: 'SIGN_IN', currentUser: snapshot.val()})
        })
        Actions.profile();
    }
}

export const addTeam = (name, city, userId) => {
    return (dispatch) =>{
        firebase.database().ref('/teams/').push().
            set({
                teamName: name,
                city: city,
                coach: userId
            })

        firebase.database().ref('/users/' + userId + '/teams').
            set({
                teamId:'12345'
            })
    }
}

export const teamChosen = (team) => {
    return (dispatch, getState) => {
        //Make async call to database 
        dispatch({type:'TEAM_CHOSEN', currentTeam: team})
    }
}

export const fetchTeams = (userId) => {
    return (dispatch) => {
      firebase.database().ref('/users/')
      .ref.orderByChild('Id').equalTo(userId).on('value', snapshot => {
        dispatch({ type: 'GET_TEAMS', teams: snapshot.val().teams });
      });
      console.log('teams i action',teams)
    };
  };
  