import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

import { Actions } from "react-native-router-flux";

export default function CreateFeed() {
  const [textValue, setValue] = useState("");
  const dateTime = new Date();

  const currentUser = useSelector((state) => state.currentUser);
  const { activeTeam } = useSelector((state) => state.currentTeams);

  const onCancelPostPressed = () => {
    // Här vill vi ändra så man kmr tillbaka till feedet, men vet inte hur utan att tappa bottommenu
    Actions.Feed();
  };

  const onPostInFeedPressed = () => {
    if (textValue != "") {
      const postRef = firebase.database().ref("/feed/").push();
      const postKey = postRef.key;

      postRef.set({
        author: currentUser.firstName + " " + currentUser.lastName,
        teamId: activeTeam.teamId,
        text: textValue,
        createdOn: dateTime.getTime(),
        postId: postKey,
        comments: [],
      });

      postRef
        .set({
          author: currentUser.firstName + " " + currentUser.lastName,
          teamId: activeTeam.teamId,
          text: textValue,
          createdOn: dateTime.getTime(),
          postId: postKey,
          comments: [],
          likes: [],
        })

        // Skapa en reducer + action!! BOB
        /* navigation.navigate("Feed", {post: {
                name: "Namn",
                text: textValue,
                createdOn: dateTime.getTime()}}) */
        .catch((error) => {
          alert(error);
        });
    }
    setValue("");
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Create a Post</Text>
      <TextInput
        placeholder={"Add text to your post"}
        numberOfLines={20}
        value={textValue}
        onChangeText={(res) => {
          setValue(res);
        }}
        multiline
        style={styles.input}
      ></TextInput>

      <TouchableOpacity
        style={styles.addPostButton}
        onPress={() => onPostInFeedPressed()}
      >
        <Text style={styles.buttonText}>Post in feed</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.cancelPost} onPress={() => onCancelPostPressed()}>
          Cancel
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    margin: 10,
  },
  cancelPost: {
    fontSize: 15,
    color: "#A247D4",
    margin: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  addPostButton: {
    backgroundColor: "green",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    height: "50%",
    fontSize: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
