import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "react-native-router-flux";
import { registerTeam, joinTeam } from "../actions/index";

function TeamRegistration() {
  const [teamName, setTeamName] = useState("");
  const [city, setCity] = useState("");
  const [teamId, setTeamId] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const addTeamButtonPressed = () => {
    if (teamName != "" && city != "") {
      dispatch(registerTeam(currentUser.id, teamName, city));
    } else Alert.alert("Please fill in both city and name for your team");
  };

  const onJoinTeamPress = () => {
    if (teamId != "") {
      dispatch(joinTeam(currentUser.id, teamId));
    }
  };

  const onCancelPress = () => {
    Actions.Profile();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.createTeamBox}>
          <Text style={styles.title}>Create New Team</Text>

          <TextInput
            style={styles.input}
            placeholder="Team name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setTeamName(text)}
            value={teamName}
            autoCapitalize="none"
          ></TextInput>

          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setCity(text)}
            value={city}
            autoCapitalize="none"
          ></TextInput>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => addTeamButtonPressed()}
          >
            <Text style={styles.buttonText}> Create Team </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}> or ...</Text>
        <View style={styles.joinTeamBox}>
          <Text style={styles.title}>Join an Already Existing Team</Text>
          <TextInput
            style={styles.input}
            placeholder="Team Id"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setTeamId(text)}
            value={teamId}
            autoCapitalize="none"
          ></TextInput>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => onJoinTeamPress()}
          >
            <Text style={styles.buttonText}> Join Team </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onCancelPress()}>
            <Text style={styles.cancelText}> Cancel </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    margin: 10,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderWidth: 0.25,
  },
  submitButton: {
    backgroundColor: "green",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  joinTeamBox: {
    marginTop: 50,
  },
  createTeamBox: {
    marginBottom: 50,
  },
  cancelText: {
    fontSize: 16,
    color: "#A247D4",
    margin: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default TeamRegistration;
