import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  Dimensions,
  View,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { registerUser } from "../actions";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

export default function RegistrationScreen() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      quality: 0.5,
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
        dispatch(registerUser(email, password, firstName, lastName, url));
      });
    } else {
      dispatch(registerUser(email, password, firstName, lastName, image));
    }
  };

  const onRegisterPress = async () => {
    if (password !== confirmPassword) {
      alert("Passwords are not matching");
      return;
    }
    await uploadImage();
  };
  const onCancelPress = () => {
    Actions.Welcome();
  };

  return (
    <SafeAreaView style={styles.container} keyboardShouldPersistTaps="always">
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
              <Text style={styles.imageText}>Add Profile Picture</Text>
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
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}> 
            <Icon name="ios-hammer-outline" size={15}></Icon>
            <Text style={styles.passwordText}>Password requirements:</Text>
            </View>
            <Text style={styles.passwordSmallText}>
              at least six letters and/or characters
            </Text>
          </View>
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
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },

  title: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 24,
  },
  image: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    borderRadius: 75,
    margin: 20,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    paddingLeft: 10,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#007E34",
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
  passwordText: {
    fontSize: 14,
    color: "#FF6347",
    marginLeft: 5,
  },
  passwordSmallText: {
    fontSize: 13,
  },
  imageText: {
    color: "#aaaaaa",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
});
