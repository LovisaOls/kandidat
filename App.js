
import * as React from 'react';
import {  } from 'react-native';

//import MyProfileScreen from '../kandidat/Screens/MyProfileScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
<<<<<<< HEAD
import RegistrationScreen from './Screens/RegistrationScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import config from "./Firebase/config";
import firebase from "firebase/app";
import MyProfileScreen from './Screens/MyProfileScreen';


const Stack = createStackNavigator();
=======
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
>>>>>>> main

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  }

  return (
<<<<<<< HEAD
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: "Welcome!"}}>
        </Stack.Screen>
        <Stack.Screen 
        name="Registration"
        component={RegistrationScreen}
        options={{ title: "Registration"}}>
        </Stack.Screen>
        <Stack.Screen
        name="Profile"
        component={MyProfileScreen}
        options={{ title: "Profile"}}>
        </Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>
=======

    <ScheduleCoach/>
>>>>>>> main
    
  );



}