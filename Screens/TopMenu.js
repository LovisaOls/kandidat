import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Actions } from 'react-native-router-flux';

import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export default function TopMenu() {

  const onSettingsPressed = () => {
    console.log(Actions.Settings());
    Actions.Settings();
  };

  const onProfilePressed = () => {
    Actions.Profile();
  }

  return (
    <View style={styles.container}>

      <View style={styles.top}>
        <TouchableOpacity onPress={() => onProfilePressed()}>
          <Image style={styles.topImage} source={require("../assets/MyProfile.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSettingsPressed()}>
          <Image style={styles.topImage} source={require("../assets/Settings.png")} />
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
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
});
