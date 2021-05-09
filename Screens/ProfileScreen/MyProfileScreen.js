import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import TeamComponent from "./TeamComponent";
import { fetchUserTeams, registerTeam } from "../../actions/index";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";

import "firebase/database";
require("firebase/auth");
import * as firebase from "firebase";

function MyProfileScreen() {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  /*   useEffect(() => {
    dispatch(fetchUserTeams(currentUser.id));
  }, [dispatch]); */

  const { userTeams } = useSelector((state) => state.currentTeams);
  const store = useStore();
  //FUNKTIONER
  const onAddTeamPressed = () => {
    Actions.TeamRegistration();
  };

  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Signed Out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <SafeAreaView keyboardShouldPersistTaps="always" style={styles.container}>
      <View style={styles.profileIcon}>
        {currentUser.profilePicture ? (
          <Image
            source={{
              uri: currentUser.profilePicture,
            }}
            style={styles.image}
          />
        ) : (
          <Icon name="person-circle-outline" size={100}></Icon>
        )}
        <Text style={styles.name}>
          {currentUser.firstName} {currentUser.lastName}
        </Text>
      </View>
      <View style={styles.myTeamsHeader}>
        <Text style={styles.title}> My Teams </Text>
        <TouchableOpacity
          style={styles.addTeamBtn}
          onPress={() => onAddTeamPressed()}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.teamsBox}>
        {userTeams &&
          Object.keys(userTeams).map((key) => {
            return <TeamComponent key={key} team={userTeams[key]} />;
          })}
      </View>
      <View>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => onSignOut()}
        >
          <Text style={styles.buttonText}> Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    margin: 10,
  },
  profileIcon: {
    marginTop: 30,
    flexDirection: "row",
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    margin: 10,
  },
  name: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  myTeamsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  teamsText: {
    fontSize: 30,
  },
  teamsBox: {
    margin: 10,
  },

  addTeamBtn: {
    width: "15%",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    marginLeft: 40,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  goBackButton: {
    width: "50%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
    margin: 10,
  },
  goForwardButton: {
    width: "50%",
    borderRadius: 25,
    height: 40,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
  },
  signOutButton: {
    backgroundColor: "green",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyProfileScreen;
