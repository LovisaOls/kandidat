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
                <View style={styles.buttons}>
                  <TouchableOpacity
                    onPress={() => onAcceptPressed(teamMembers[key].id)}
                  >
                    <Icon
                      name="checkmark-circle-sharp"
                      size={30}
                      color="#007E34"
                    ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onDeclinePressed(teamMembers[key].id)}
                  >
                    <Icon
                      name="close-circle-sharp"
                      size={30}
                      color="#FF6347"
                    ></Icon>
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
    marginTop: 5,
    padding: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
  },
  buttons: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "left",
    fontWeight: "bold",
    margin: 10,
  },
});

export default MembershipRequests;
