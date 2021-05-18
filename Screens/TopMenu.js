import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export default function TopMenu() {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const currentUser = useSelector((state) => state.currentUser);

  const onProfilePressed = () => {
    Actions.Profile();
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.teamName}>{activeTeam.teamName} </Text>
          {activeTeam.members[currentUser.id] == "coach" ? (
            <Icon name="shield-checkmark" size={20} color="#A247D4"></Icon>
          ) : null}
        </View>
        <TouchableOpacity onPress={() => onProfilePressed()}>
          <Icon name="person-outline" size={30}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  teamName: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
