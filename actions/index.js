import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

import { Actions } from 'react-native-router-flux';
//Kallas i welcome screen - loggar in en användare med email och password
export const signIn = (email, password) => {
    return (dispatch) => {
        //Make async call to database 
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                // Signed in
                firebase.database().ref(`/users/${response.user.uid}`).on('value', snapshot => {
                    dispatch({type: 'SET_CURRENT_USER', currentUser: snapshot.val()})
                })
                Actions.Profile()
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
        firebase.database().ref(`/users/${userId}`).on('value', snapshot => {
            dispatch({ type: 'SET_CURRENT_USER', currentUser: snapshot.val()})
        })
        Actions.Profile();
    }
}

//Lägg till ny användare i db
export const registerUser = (email, password, firstName, lastName) => {
    return(dispatch) => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
        firebase.database().ref(`/users/${response.user.uid}`)
                .set({
                    id: response.user.uid,
                    email: email,
                    firstName: firstName,
                    lastName: lastName}) 
                .then(() => {
                    firebase.database().ref(`/users/${response.user.uid}`).on('value', snapshot => {
                        dispatch({ type: 'SET_CURRENT_USER', currentUser: snapshot.val()})
                    })
                    Actions.Profile()
                    
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

//Lägg till nytt lag i db
export const registerTeam = (userId, teamName, city) => {
    return(dispatch) => {
        const teamRef = firebase.database().ref('/teams/').push();      
        const teamKey = teamRef.key;
        console.log('teamKey:', teamKey)
        teamRef.set({
            teamName: teamName,
            city: city,
            coach: userId,
            members: {}
        }).then(
            //lägger in userId som member i laget
            firebase.database().ref(`/teams/${teamKey}/members/`).child(userId).set(true)
        )
        .then( () => {
            //Lägger in lagId hos user
            firebase.database().ref(`/users/${userId}/teams/`).child(teamKey).set(true)
            dispatch({type:'ADD_TEAM'})
            Actions.Profile()
        })
    }
}

export const fetchUserTeams = (userId) => {
    return(dispatch) => {
        let teamIds = {};
        firebase.database().ref(`/users/${userId}/teams`).on('value', snapshot => {
                teamIds = snapshot.val()
        })

        let userTeams = [];
        if(teamIds){
            {Object.keys(teamIds).map(teamId => {
                firebase.database()
                    .ref(`/teams/${teamId}`)
                    .on('value', snapshot => {
                        if(snapshot.exists){
                            const team = snapshot.val();
                            userTeams.push(team)
                        } else {
                    console.log("No data available");
                }})
             }) } 
        }
        dispatch({type:'FETCH_TEAMS', userTeams: userTeams});
    }
}

export const joinTeam = () =>{
    return(dispatch) => {
        console.log('join team')
    }
}

export const teamChosen = (team) => {
    return (dispatch, getState) => {
        //Make async call to database 
        dispatch({type:'TEAM_CHOSEN', currentTeam: team})
    }
}