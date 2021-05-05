import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { acceptMember, declineMember } from "../../actions/index";

const MembershipRequests = () => {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const { teamMembers } = useSelector((state) => state.currentTeams);

  const dispatch = useDispatch();
  const onAcceptPressed = (userId) => {
    console.log("accepted", userId);
    dispatch(acceptMember(userId, activeTeam.teamId));
  };
  const onDeclinePressed = (userId) => {
    console.log("declined", userId);
    dispatch(declineMember(userId, activeTeam.teamId));
  };

  return (
    <View>
      <Text style={styles.title}>Membership Requests</Text>

      {teamMembers &&
        Object.keys(teamMembers).map((key, i) => {
          return teamMembers[key].teams[activeTeam.teamId] == false ? (
            <View style={styles.requestBox}>
              <Text style={styles.name}>
                {teamMembers[key].firstName} {teamMembers[key].lastName}
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => onAcceptPressed(teamMembers[key].id)}
                >
                  <Icon
                    name="checkmark-circle-sharp"
                    size={30}
                    color="green"
                  ></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={() => onDeclinePressed(teamMembers[key].id)}
                >
                  <Icon name="close-circle-sharp" size={30} color="red"></Icon>
                </TouchableOpacity>
              </View>
            </View>
          ) : null;
        })}
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
