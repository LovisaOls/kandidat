import React, { useEffect } from "react";
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
import { fetchUserTeams } from "../../actions/index";
import { Actions } from "react-native-router-flux";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

function MyProfileScreen() {
  const currentUser = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserTeams(currentUser.id));
  }, [dispatch]);

  const { userTeams } = useSelector((state) => state.currentTeams);

  //FUNKTIONER
  const onAddTeamPressed = () => {
    Actions.TeamRegistration();
  };

  const goBackButton = () => {
    Actions.BottomMenu();
  };

  const goToFeedOSV = () => {
    Actions.BottomMenu();
  };

  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Signed Out");
        Actions.Welcome();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <SafeAreaView keyboardShouldPersistTaps="always" style={styles.container}>
      <View style={styles.profileIcon}>
        <Image
          style={styles.image}
          source={require("../../assets/Profile.png")}
        />
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
      <View>
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
    margin: 10,
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
    marginBottom: 50,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  myTeamsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  teamsText: {
    fontSize: 30,
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
