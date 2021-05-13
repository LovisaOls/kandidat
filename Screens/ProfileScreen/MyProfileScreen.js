import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import TeamComponent from "./TeamComponent";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

import "firebase/database";
require("firebase/auth");
import * as firebase from "firebase";

function MyProfileScreen() {
  const currentUser = useSelector((state) => state.currentUser);

  const { userTeams } = useSelector((state) => state.currentTeams);
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
      <ScrollView>
        <View style={styles.profileIcon}>
          {currentUser.profilePicture ? (
            <Image
              source={{
                uri: currentUser.profilePicture,
              }}
              style={styles.image}
            />
          ) : (
            <View style={styles.initialCircle}>
              <Text style={styles.initialText}>
                {currentUser.firstName[0]}
                {currentUser.lastName[0]}
              </Text>
            </View>
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
      </ScrollView>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;
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
    height: screenWidth * 0.35,
    width: screenWidth * 0.35,
    borderRadius: (screenWidth * 0.35) / 2,
    margin: 10,
  },
  name: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
    marginTop: 20,
    fontWeight: "bold",
  },
  myTeamsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
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

  signOutButton: {
    backgroundColor: "green",
    marginVertical: 20,
    marginHorizontal: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  initialCircle: {
    height: screenWidth * 0.35,
    width: screenWidth * 0.35,
    borderRadius: (screenWidth * 0.35) / 2,
    margin: 10,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
  },
});

export default MyProfileScreen;
