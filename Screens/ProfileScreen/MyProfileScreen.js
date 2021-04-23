
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

function MyProfileScreen() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const { teams } = useSelector(state => state.currentUser);

    const onAddTeamPressed = () => {
        Actions.teamRegistration();
    }

    const goBackButton = () => {
        Actions.BottomMenu();
    }

    const goToFeedOSV = () => {
        Actions.BottomMenu();
    }

    const onSignOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('Signed Out')
            Actions.Welcome();
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <View style={styles.container}>
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
            <View style={styles.addedTeams}>
                {teams && Object.keys(teams).map((teamId, i) => (
                    <TeamComponent key={i} teamId={teams[teamId].teamId} />
                ))}
            </View>
            <View>
                <TouchableOpacity style={styles.addTeamBtn} onPress={() => onSignOut()} >
                    <Text style={styles.addTeam}> SIGN OUT</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.goBackButton} onPress={() => goBackButton()} >
                <Text> GO BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goForwardButton} onPress={() => goToFeedOSV()} >
                <Text> GO to feed osv osv</Text>
            </TouchableOpacity>

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
    goBackButton: {
        width: "15%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink",
        marginLeft: 40,
    },
    goForwardButton: {
        width: "15%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "tomato",
        marginLeft: 40,
    },



});

export default MyProfileScreen;
