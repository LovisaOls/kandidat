
import React, { useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import TeamComponent from './TeamComponent';
import TopMenu from "../TopMenu";
import { Actions } from 'react-native-router-flux';
import { fetchTeams } from "../../actions";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

function MyProfileScreen() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    console.log(currentUser);
    //console.log('teams currentU', currentUser.teams)

    const onAddTeamPressed = () =>{
        Actions.teamRegistration();
    }
    const onSignOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('Signed Out')
            Actions.loading();
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <View style={styles.container}>
            <TopMenu />
            <View style={styles.profileIcon}>
                <Image style={styles.image} source={require("../../assets/Profile.png")} />
                <Text style={styles.name}>{currentUser.firstName} {currentUser.lastName}</Text>
            </View>

            <View style={styles.teams}>
                <Text style={styles.teamsText}> My Teams </Text>
                <TouchableOpacity style={styles.addTeamBtn} onPress={() => onAddTeamPressed()} >
                    <Text style={styles.addTeam}>+</Text>
                </TouchableOpacity>
            </View>

           {/* <View style={styles.addedTeams}>
                {teams && teams.map(team => {
                    return (
                        <TeamComponent team = {team} key={team.teamId}/>    
                    )
                })}
            </View>
 */}
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
    addedTeams: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 30,
        borderStyle: "dashed",
        borderRadius: 1,
        borderColor: "green",
        borderWidth: 1,
    },

    addedTeamsText: {
        fontSize: 20,
        padding: 10,
    },

});

export default MyProfileScreen;
