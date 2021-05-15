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
    Alert.alert(
      "Pending Membership Request",
      "Waiting for the coach to accept your membership request "
    );
  };

  return team.members[currentUser.id] == true ? (
    <View style={styles.teamBox}>
      <TouchableOpacity style={styles.teamBox} onPress={() => onTeamPressed()}>
        <View style={{ alignItems: "center", flexDirection: "row", margin: 1 }}>
          {currentUser.id == team.coach ? (
            <View>
              <Icon name="shield-checkmark" size={16} color="#A247D4"></Icon>
            </View>
          ) : null}
          <Text style={styles.teamsText}>{team.teamName}</Text>
        </View>
        <Icon style={styles.teamsText} name="chevron-forward-outline"></Icon>
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity style={styles.teamBox} onPress={() => onPendingPressed()}>
      <Text style={styles.teamsText}>{team.teamName}</Text>
      <Icon style={styles.teamsText} name="hourglass-outline"></Icon>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  teamsText: {
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },

  teamBox: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    marginVertical: 1,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamBoxPending: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    marginVertical: 1,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TeamComponent;
