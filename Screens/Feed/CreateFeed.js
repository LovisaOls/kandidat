import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../actions/index";
import { Actions } from "react-native-router-flux";

export default function CreateFeed() {
  const [textValue, setValue] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const dispatch = useDispatch();

  const onCancelPostPressed = () => {
    Actions.pop();
  };

  const onPostInFeedPressed = () => {
    if (textValue != "") {
      dispatch(createPost(currentUser, activeTeam.teamId, textValue));
      setValue("");
      Actions.pop();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
    backgroundColor: "#007E34",
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
    borderRadius: 10,
    padding: 15,
    height: "30%",
    fontSize: 16,
    backgroundColor: "#DDDDDD",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
