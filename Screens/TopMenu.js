import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export default function TopMenu() {
  const { activeTeam } = useSelector((state) => state.currentTeams);

  const onSettingsPressed = () => {
    Actions.Settings();
  };

  const onProfilePressed = () => {
    Actions.Profile();
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => onProfilePressed()}>
          <Icon name="person-outline" size={30}></Icon>
        </TouchableOpacity>
        <Text style={styles.teamName}>{activeTeam.teamName}</Text>
        <TouchableOpacity onPress={() => onSettingsPressed()}>
          <Icon name="settings-outline" size={30}></Icon>
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
    fontSize: 20,
    fontWeight: "bold",
  },
});
