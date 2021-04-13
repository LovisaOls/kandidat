
import React from 'react';
import {  } from 'react-native';

import MyProfileScreen from '../kandidat/Screens/MyProfileScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import config from "./Firebase/config";
import firebase from "firebase/app";
import CoachHome from './Screens/CoachHome';
import FeedScreen from './Screens/FeedScreen';
import TacticsCoach from './Screens/TacticsCoach';
import ScheduleCoach from './Screens/ScheduleCoach';

const Stack = createStackNavigator();

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  }

  return (

    <ScheduleCoach/>
    
  );



}