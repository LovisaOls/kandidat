import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "react-native-router-flux";
import { registerTeam, joinTeam } from "../actions/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";

function TeamRegistration() {
  const [teamName, setTeamName] = useState("");
  const [city, setCity] = useState("");
  const [teamId, setTeamId] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("You have not allowed premission to your cameraroll");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.image,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.2,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (image != null) {
      let filename = image.split("/").pop();
      const response = await fetch(image);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref()
        .child("images/" + filename);
      const snapshot = await ref.put(blob);
      blob.close();
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(registerTeam(currentUser.id, teamName, city, url));
      });
    } else {
      dispatch(registerTeam(currentUser.id, teamName, city, image));
    }
  };

  const addTeamButtonPressed = async () => {
    if (teamName != "" && city != "") {
      await uploadImage();
    } else {
      Alert.alert("Please fill in both city and name for your team");
      return;
    }
  };

  const onJoinTeamPress = () => {
    if (teamId != "") {
      dispatch(joinTeam(currentUser.id, teamId));
    }
  };

  const onCancelPress = () => {
    Actions.pop();
  };

  return (
    <SafeAreaView keyboardShouldPersistTaps="always" style={styles.container}>
      <ScrollView>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          <View style={styles.createTeamBox}>
            <Text style={styles.title}>Create New Team</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {image ? (
                <TouchableOpacity onPress={pickImage}>
                  <Image source={{ uri: image }} style={styles.image} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.image} onPress={pickImage}>
                  <Text style={styles.imageText}>Add Team Picture</Text>
                </TouchableOpacity>
              )}
              <View>
                <TextInput
                  style={styles.inputNewTeam}
                  placeholder="Team name"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setTeamName(text)}
                  value={teamName}
                  autoCapitalize="none"
                ></TextInput>

                <TextInput
                  style={styles.inputNewTeam}
                  placeholder="City"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setCity(text)}
                  value={city}
                  autoCapitalize="none"
                ></TextInput>
              </View>
            </View>
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
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
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
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    paddingLeft: 16,
    margin: 10,
  },
  inputNewTeam: {
    fontSize: 16,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    paddingLeft: 16,
    margin: 10,
    width: screenWidth * 0.5,
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
    marginTop: 30,
  },
  createTeamBox: {
    marginBottom: 30,
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
  image: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageText: {
    color: "#aaaaaa",
    fontSize: 14,
    textAlign: "center",
  },
});

export default TeamRegistration;
