import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { registerUser } from "../actions";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";

export default function RegistrationScreen() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

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
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
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
      setImageUrl(url);
      console.log("url", imageUrl);
      return url;
    });
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords are not the same");
      return;
    }
    uploadImage();
    dispatch(registerUser(email, password, firstName, lastName, imageUrl));
  };
  const onCancelPress = () => {
    Actions.Welcome();
  };

  return (
    <SafeAreaView
      style={styles.container}
      style={{ flex: 1, width: "100%" }}
      keyboardShouldPersistTaps="always"
    >
      <ScrollView>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          <Text style={styles.title}>Create Account</Text>
          {image ? (
            <TouchableOpacity onPress={pickImage}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.image} onPress={pickImage}>
              <Text>Add Profile Picture</Text>
            </TouchableOpacity>
          )}
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onRegisterPress()}
          >
            <Text style={styles.buttonTitle}> Register </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onCancelPress()}>
            <Text style={styles.cancelText}> Cancel </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
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
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 20,
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
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
        color: '#A247D4',
        margin: 10,
        alignContent:'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
})
