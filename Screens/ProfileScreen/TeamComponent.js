import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { setActiveTeam } from "../../actions/index";

const TeamComponent = ({ team }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const onTeamPressed = () => {
    dispatch(setActiveTeam(team.teamId));
  };

  const onPendingPressed = () => {
    Alert.alert("Waiting for the coach to accept your membership :) ");
  };

  return team.members[currentUser.id] == true ? (
    <View style={styles.teamBox}>
      <TouchableOpacity style={styles.teamBox} onPress={() => onTeamPressed()}>
        <Text style={styles.teamsText}>{team.teamName}</Text>
        <Icon style={styles.teamsText} name="chevron-forward-outline"></Icon>
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity
      style={styles.teamBoxPending}
      onPress={() => onPendingPressed()}
    >
      <Text style={styles.teamsText}>{team.teamName}</Text>
      <Icon style={styles.teamsText} name="hourglass-outline"></Icon>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  teamsText: {
    fontSize: 20,
    padding: 15,
  },

  teamBox: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    margin: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  teamBoxPending: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    margin: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TeamComponent;
