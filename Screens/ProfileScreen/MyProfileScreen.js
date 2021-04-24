
import React, { useEffect } from "react";
import { useDispatch, useSelector, useStore} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import TeamComponent from './TeamComponent';
import TopMenu from "../TopMenu";
import {fetchUserTeams} from '../../actions/index';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

function MyProfileScreen() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);


    /* useEffect(() => {
            dispatch(fetchUserTeams(currentUser.Id));
    }, [dispatch]); */

    const currentTeams = useSelector(state => state.currentTeams);

    console.log("Current teams:");
    console.log(currentTeams);

    //FUNKTIONER
    const onAddTeamPressed = () =>{
        Actions.teamRegistration();
    }
    const onSignOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('Signed Out')
            Actions.welcome();
          }).catch((error) => {
            // An error happened.
          });
    }

    return (
        <View style={styles.container}>
            <TopMenu />
            <View style={styles.profileIcon}>
                <Image style={styles.image} source={require("../../assets/Profile.png")} />
                <Text style={styles.name}> {currentUser.firstName} {currentUser.lastName}</Text>
            </View>
            <View style={styles.teams}>
                <Text style={styles.teamsText}> My Teams </Text>
                <TouchableOpacity style={styles.addTeamBtn} onPress={() => onAddTeamPressed()} >
                    <Text style={styles.addTeam}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.teamContainer}>
              {/*  {currentTeams && currentTeams.map(team =>{
                    return(
                        <TeamComponent team = {team}/>
                    )})
                } */}
            </View>
            <View>
                <TouchableOpacity style={styles.addTeamBtn} onPress={() => onSignOut()} >
                    <Text style={styles.addTeam}> SIGN OUT</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },

    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        margin: 10,
    },

    topImage: {
        height: 40,
        width: 40,
    },

    profileIcon: {
        marginTop: 30,
        flexDirection: "row",
    },

    image: {
        marginBottom: 50,
        height: 100,
        width: 100,
        borderRadius: 50
    },
    name: {
        fontSize: 20,
        textAlign: "center",
    },
    teams: {
        flexDirection: "row",
    },

    teamsText: {
        fontSize: 30,
    },

    addTeamBtn: {
        width: "15%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        marginLeft: 40,
    },
    teamContainer:{
        marginTop: 5,
        marginBottom:5,
        borderStyle: 'solid',
        borderColor: 'green',
        borderRadius:10
    }

});

export default MyProfileScreen;
