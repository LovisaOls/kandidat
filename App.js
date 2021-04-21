import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";
import * as React from "react";
import { } from "react-native";
import config from "./Firebase/config";
import CoachHome from './Screens/CoachHome';
import FeedScreen from './Screens/FeedScreen';
import MyProfileScreen from './Screens/MyProfileScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import ScheduleCoach from './Screens/ScheduleCoach';
import TacticsCoach from './Screens/TacticsCoach';
import WelcomeScreen from './Screens/WelcomeScreen';
import TestSchedule from './Screens/TestSchedule';
import TeamRegistration from './Screens/TeamRegistration';
import Settings from './Screens/Settings';
import CreateEventSchedule from './Screens/CreateEventSchedule';
import Feed from './Screens/Feed';
import CreateFeed from './Screens/CreateFeed';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import TestSchedule from "./Screens/TestSchedule";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomMenu() {
  return (
    <Tab.Navigator
      initialRouteName="CoachHome"
      tabBarOptions={{
        activeTintColor: "#A247D4",
        inactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="CoachHome"
        component={CoachHome}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-chatbox-ellipses-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-calendar-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="TacticsCoach"
        component={TacticsCoach}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-football" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomMenu" component={BottomMenu}></Stack.Screen>
        <Stack.Screen name="CoachHome" component={CoachHome}></Stack.Screen>
        <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
        <Stack.Screen name="TeamRegistration" component={TeamRegistration}></Stack.Screen>
        <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name="Profile" component={MyProfileScreen}></Stack.Screen>
        <Stack.Screen name="ScheduleCoach" component={ScheduleCoach}></Stack.Screen>
        <Stack.Screen name="Registration" component={RegistrationScreen} //options={{ title: "Registration"}} 
        ></Stack.Screen>
        <Stack.Screen name="CreateFeed" component={CreateFeed}></Stack.Screen>
        <Stack.Screen name="Feed" component={Feed}></Stack.Screen>
        <Stack.Screen name="TacticsCoach" component={TacticsCoach}></Stack.Screen>
        <Stack.Screen name="TestSchedule" component={TestSchedule}></Stack.Screen>
        <Stack.Screen name="CreateEventSchedule" component={CreateEventSchedule}></Stack.Screen>


</Stack.Navigator>
</NavigationContainer>
);
}
