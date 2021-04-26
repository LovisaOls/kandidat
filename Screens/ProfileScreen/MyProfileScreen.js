import React, { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import TeamComponent from "./TeamComponent";
import { fetchUserTeams } from "../../actions/index";
import TopMenu from "../TopMenu";
import { Actions } from "react-native-router-flux";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

function MyProfileScreen() {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  /*     const fetchTeams = async () => {
        setLoading(true);
        await 
        setLoading(true);
    } */
  useEffect(() => {
    dispatch(fetchUserTeams(currentUser.id));
  }, [dispatch]);

  const store = useStore();
  console.log(store.getState());
  const { userTeams } = useSelector((state) => state.currentTeams);
  console.log("Current teams:");
  console.log(userTeams);

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
    <View style={styles.container}>
      <View style={styles.profileIcon}>
        <Image
          style={styles.image}
          source={require("../../assets/Profile.png")}
        />
        <Text style={styles.name}>
          {" "}
          {currentUser.firstName} {currentUser.lastName}
        </Text>
      </View>
      <View style={styles.teams}>
        <Text style={styles.teamsText}> My Teams </Text>
        <TouchableOpacity
          style={styles.addTeamBtn}
          onPress={() => onAddTeamPressed()}
        >
          <Text style={styles.addTeam}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.teamContainer}>
        {Object.keys(userTeams).map((key) => {
          return <TeamComponent key={key} team={userTeams[key]} />;
        })}
      </View>
      <View>
        <TouchableOpacity style={styles.addTeamBtn} onPress={() => onSignOut()}>
          <Text style={styles.addTeam}> SIGN OUT</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => goBackButton()}
      >
        <Text> GO BACK</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goForwardButton}
        onPress={() => goToFeedOSV()}
      >
        <Text> GO to feed osv osv</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 50,
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
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
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
  teamContainer: {
    marginTop: 5,
    marginBottom: 5,
    borderStyle: "solid",
    borderColor: "green",
    borderRadius: 10,
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
});

export default MyProfileScreen;
