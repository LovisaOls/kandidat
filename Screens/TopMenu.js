import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";

export default function TopMenu() {
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
          <Icon name="person-outline" size={34}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSettingsPressed()}>
          <Icon name="settings-outline" size={34}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});
