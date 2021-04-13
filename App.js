
import React from 'react';
import {  } from 'react-native';

//import MyProfileScreen from '../kandidat/Screens/MyProfileScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
<<<<<<< HEAD
//import RegistrationScreen from './Screens/RegistrationScreen';
//import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
=======
import RegistrationScreen from './Screens/RegistrationScreen';
>>>>>>> 683fd1c3e2e2330253fd8bfe1ca5fe7ba476bd8b
import config from "./Firebase/config";
import firebase from "firebase/app";
import CoachHome from './Screens/CoachHome';
import FeedScreen from './Screens/FeedScreen';
import TacticsCoach from './Screens/TacticsCoach';
import ScheduleCoach from './Screens/ScheduleCoach';

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  }

  return (

    <ScheduleCoach/>
    
  );



}