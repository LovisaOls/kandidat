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

import TopMenu from "../Screens/TopMenu";

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
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log('Signed Out')
        Actions.Welcome();
      }).catch((error) => {
      // An error happened.
  });
  };

  const goBackButton = () => {
    Actions.BottomMenu();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

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
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => goBackButton()}
      >
        <Text>Go Back</Text>

      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
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
  goBackButton: {
    backgroundColor: "blue",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
