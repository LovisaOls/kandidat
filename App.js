
import React from 'react';
import {  } from 'react-native';

import MyProfileScreen from '../kandidat/Screens/MyProfileScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import config from "./Firebase/config";
import firebase from "firebase/app";

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  }

  return (

    <RegistrationScreen/>
    
  );



}