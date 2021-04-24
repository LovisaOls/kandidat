
import firebase from "firebase/app";
import * as React from "react";
import { } from "react-native";
import config from "./Firebase/config";
import CoachHome from './Screens/CoachHome';
import MyProfileScreen from './Screens/ProfileScreen/MyProfileScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import TacticsCoach from './Screens/TacticsCoach';
import WelcomeScreen from './Screens/WelcomeScreen';
import TestSchedule from './Screens/TestSchedule';
import TeamRegistration from './Screens/TeamRegistration';
import LoadingScreen from './Screens/LoadingScreen';
import Settings from './Screens/Settings';
import { Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import CreateFeed from './Screens/CreateFeed';
import Feed from './Screens/Feed';
import CreateEventSchedule from './Screens/CreateEventSchedule';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Icon from "react-native-vector-icons/Ionicons";

const store = createStore(rootReducer, applyMiddleware(thunk));

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
        component={Feed}
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
    <Provider store = {store} >
        
      <Router>
          <Scene key="root">
            {/* <Scene key="BottomMenu" component={BottomMenu}/> */}

            {/* loading måste ligga överst */}
            <Scene key="loading" component={LoadingScreen}/>
            <Scene key="welcome" component={WelcomeScreen} title="Welcome" />
            <Scene key="registration" component={RegistrationScreen} title="Registration" />
            <Scene key="profile" component={MyProfileScreen} title="Profile"/>
            <Scene key="teamRegistration" component={TeamRegistration} title="Team Registration"/>
            <Scene key="CoachHome" component={CoachHome}/>
            <Scene key="Settings" component={Settings}/>
            <Scene key="CreateFeed" component={CreateFeed}/>
            <Scene key="Feed" component={Feed}/>
            <Scene key="TacticsCoach" component={TacticsCoach}/>
            <Scene key="TestSchedule" component={TestSchedule}/>
            <Scene key="CreateEventSchedule" component={CreateEventSchedule}/>
          </Scene>
      </Router>

    </Provider>
  );

}


