import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

import { Actions } from 'react-native-router-flux';

//Kallas i welcome screen
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
                // Om man vill komma till feed, osv ändra Profile() till BottomMenu()
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

//Kallas i loading screen
export const setCurrentUser = (userId) => {
    return (dispatch) => {
        firebase.database().ref('/users/'+ userId).on('value', snapshot => {
            dispatch({ type: 'SIGN_IN', currentUser: snapshot.val()})
        })
        Actions.Profile();
    }
}

export const registerUser = (email, password, firstName, lastName) => {
    return(dispatch) => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
        firebase.database().ref('/users/' + response.user.uid)
                .set({
                    id: response.user.uid,
                    email: email,
                    firstName: firstName,
                    lastName: lastName}) 
                .then(() => {
                    firebase.database().ref('/users/'+response.user.uid).on('value', snapshot => {
                        dispatch({ type: 'SIGN_IN', currentUser: snapshot.val()})
                    })
                    Actions.Profile();
                })
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error)
        });
    }
}

export const teamChosen = (team) => {
    return (dispatch, getState) => {
        //Make async call to database 
        dispatch({type:'TEAM_CHOSEN', currentTeam: team})
    }
}