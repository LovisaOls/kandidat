
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useReducer } from "react";

export default function WelcomeScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  let user;
  const loginButtonPressed = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
      firebase.database().ref('/users/'+response.user.uid)
      .once('value',snap =>{
        user = snap.val();
      })
      .then(() => {
        navigation.navigate('Profile', {user: user})
    })

    })};
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/Logga.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
        />
      </View>
 
      <TouchableOpacity style={styles.loginBtn} onPress={() => loginButtonPressed()}>
        <Text style={styles.loginText}>LOGIN</Text>
    
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    height: 100,
    width: 100,
  },
 
  inputView: {
    backgroundColor: "green",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "green",
  },
});