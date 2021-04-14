import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView} from "react-native";
import { useReducer } from "react";

export default function WelcomeScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let user;
  const loginButtonPressed = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
      firebase.database().ref('/users/'+response.user.uid)
      .once('value',snap =>{
        user = snap.val();
      })
      .then(() => {
        console.log(user)
        console.log('navigera till profil')
        navigation.navigate('Profile', {user})
      })
    })
  };
  
  const onRegisterPressed = () => {
      navigation.navigate('Registration')
  };
 
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

        <View style={styles.theLogo}>
          <Image style={styles.image} source={require("../assets/Logga.png")} />
        </View>
          <TextInput
            style={styles.inputView}
            placeholder='Email address'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value = {email}
            autoCapitalize="none"
          /> 
          <TextInput
            style={styles.inputView}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize="none"
          />

        <TouchableOpacity style={styles.loginBtn} onPress={() => loginButtonPressed()}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot_button} onPress={() => onRegisterPressed()}>Register</Text>
        </TouchableOpacity>
{/* 
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity> */}
    
      </SafeAreaView>
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
 
  theLogo: {
    alignItems: "center",
    marginTop: 100,
  },

  image: {
    marginBottom: 40,
    height: 150,
    width: 150,
    alignItems: "center",
  },
  inputView: {
    fontSize: 16,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderWidth: 0.25
  },

  forgot_button: {
    fontSize: 16,
    color: 'blue',
    margin: 10,
    alignContent:'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
 
  loginBtn: {
    backgroundColor: 'green',
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  
});