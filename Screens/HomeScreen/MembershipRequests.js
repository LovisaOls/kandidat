import React from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import "firebase/database";
require("firebase/auth");
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

const MembershipRequests = () => {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const { teamMembers } = useSelector((state) => state.currentTeams);
  const screenHeight = Dimensions.get("window").height;

  const onAcceptPressed = (userId) => {
    firebase
      .database()
      .ref(`/users/${userId}/teams/${activeTeam.teamId}`)
      .set(true)
      .then(
        firebase
          .database()
          .ref(`/teams/${activeTeam.teamId}/members/${userId}`)
          .set(true)
      );
  };
  const onDeclinePressed = (userId) => {
    firebase
      .database()
      .ref(`/users/${userId}/teams/${activeTeam.teamId}`)
      .remove()
      .then(
        firebase
          .database()
          .ref(`/teams/${activeTeam.teamId}/members/${userId}`)
          .remove()
      );
  };

  return (
    <View>
      <Text style={styles.title}>Membership Requests</Text>
      <ScrollView style={{ maxHeight: screenHeight * 0.45 }}>
        {teamMembers &&
          Object.keys(teamMembers).map((key, i) => {
            return teamMembers[key].teams[activeTeam.teamId] == false ? (
              <View key={i} style={styles.requestBox}>
                <Text style={styles.name}>
                  {teamMembers[key].firstName} {teamMembers[key].lastName}
                </Text>

                <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                  <TouchableOpacity
                    onPress={() => onAcceptPressed(teamMembers[key].id)}
                    style={[styles.acceptButton, { width: null }]}
                  >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => onDeclinePressed(teamMembers[key].id)}
                    style={[styles.declineButton, { width: null }]}
                  >
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null;
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
  },
  requestBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    margin: 1,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 0.25,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "left",
    fontWeight: "bold",
    margin: 10,
  },
  acceptButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#007E34",
    margin: 5,
    width: "40%",
    justifyContent: "center",
  },
  declineButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#DDDDDD",
    margin: 5,
    width: "40%",
    justifyContent: "center",
  },
  acceptButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  declineButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MembershipRequests;
