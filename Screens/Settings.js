import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";

export default function Settings() {
  const changePasswordButton = () => {
    console.log("hej");

    Alert.alert(
      "New Password",
      "A link to reset your password has been sent to your email",
      [
        {
          text: "Ok",
        },
      ]
    );
  };

  const signOutButton = () => {
    console.log("ja");
  };

  const goBackButton = () => {
    Actions.BottomMenu();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Icon name="ios-chevron-back-outline" size={40}
          onPress={() => goBackButton()}></Icon>
        <Text style={styles.title}>Settings</Text>
      </View>

      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => changePasswordButton()}
      >
        <Text>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => signOutButton()}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  topBar: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 120,
    margin: 10,
  },
  changePasswordButton: {
    backgroundColor: "green",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  signOutButton: {
    backgroundColor: "green",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
