import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { signIn } from "../actions/index";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function WelcomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginButtonPressed = () => {
    dispatch(signIn(email, password));
  };

  const onRegisterPressed = () => {
    Actions.Registration();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          <View style={styles.theLogo}>
            <Image
              style={styles.image}
              source={require("../assets/Logga.png")}
            />
          </View>

          <View style={styles.inputView}>
            <Icon name="mail-outline" color={"#aaaaaa"} size={18}></Icon>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEmail(text)}
              value={email}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputView}>
            <Icon name="key-outline" color={"#aaaaaa"} size={18}></Icon>
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => loginButtonPressed()}
          >
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              style={styles.forgot_button}
              onPress={() => onRegisterPressed()}
            >
              Register
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  theLogo: {
    alignItems: "center",
    marginTop: 100,
  },

  image: {
    marginBottom: 40,
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },

  inputView: {
    fontSize: 16,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    paddingLeft: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    height: 48,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 30,
    paddingLeft: 10,
    width: screenWidth * 0.8,
  },

  forgot_button: {
    fontSize: 16,
    color: "#A247D4",
    margin: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  loginBtn: {
    backgroundColor: "#007E34",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
