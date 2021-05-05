import { StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";

import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

import { Actions } from "react-native-router-flux";

export default function CreateEventSchedule() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");

  const { activeTeam } = useSelector((state) => state.currentTeams);

  const onCreatePress = () => {
    const eventRef = firebase.database().ref("/events/").push();
    const eventKey = eventRef.key;
    eventRef
      .set({
        teamId: activeTeam.teamId,
        eventId: eventKey,
      })
      .then(
        firebase
          .database()
          .ref(`/events/${eventKey}/eventDetails/`)
          .child(date)
          .set({
            title: title,
            type: type,
            time: time,
            place: place,
            description: description,
          })
      )
      .then(() => {
        Actions.pop();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Create Event</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <TextInput
          style={styles.input}
          placeholder="Type"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setType(text)}
          value={type}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDate(text)}
          value={date}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Time"
          onChangeText={(text) => setTime(text)}
          value={time}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Place"
          onChangeText={(text) => setPlace(text)}
          value={place}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onCreatePress()}>
          <Text style={styles.buttonTitle}> Create </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.pop()}>
          <Text style={styles.cancelText}> Cancel </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    textAlign: "center",
  },

  title: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
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
  button: {
    backgroundColor: "green",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  cancelText: {
    fontSize: 16,
    color: "#A247D4",
    margin: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
