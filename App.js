
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";
import * as React from 'react';
import { } from 'react-native';
import config from "./Firebase/config";
import CoachHome from './Screens/CoachHome';
import FeedScreen from './Screens/FeedScreen';
import MyProfileScreen from './Screens/MyProfileScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import ScheduleCoach from './Screens/ScheduleCoach';
import TacticsCoach from './Screens/TacticsCoach';
import WelcomeScreen from './Screens/WelcomeScreen';


const Stack = createStackNavigator();

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        //options={{ title: "Welcome!"}}
        >
      </Stack.Screen>
      <Stack.Screen 
        name="Registration"
        component={RegistrationScreen}
        //options={{ title: "Registration"}}
        >
      </Stack.Screen>
      
      <Stack.Screen
        name="Profile"
        component={MyProfileScreen}
        //options={{ title: "Profile"}}
        >
      </Stack.Screen>
      <Stack.Screen
        name="CoachHome"
        component={CoachHome}
        >
      </Stack.Screen>
      <Stack.Screen
        name="FeedScreen"
        component={FeedScreen}
        >
      </Stack.Screen>
      <Stack.Screen
        name="TacticsCoach"
        component={TacticsCoach}
        >
      </Stack.Screen>
      <Stack.Screen
        name="ScheduleCoach"
        component={ScheduleCoach}
        >
      </Stack.Screen>



      </Stack.Navigator>

    </NavigationContainer>
    
  );



}