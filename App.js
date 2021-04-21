
//import { NavigationContainer } from '@react-navigation/native';
import firebase from "firebase/app";
import * as React from 'react';
import { } from 'react-native';
import config from "./Firebase/config";
import CoachHome from './Screens/CoachHome';
import FeedScreen from './Screens/FeedScreen';
import MyProfileScreen from './Screens/ProfileScreen/MyProfileScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import ScheduleCoach from './Screens/ScheduleCoach';
import TacticsCoach from './Screens/TacticsCoach';
import WelcomeScreen from './Screens/WelcomeScreen';
import TestSchedule from './Screens/TestSchedule';
import TeamRegistration from './Screens/TeamRegistration';
import LoadingScreen from './Screens/LoadingScreen';
import Settings from './Screens/Settings';
import { Router, Scene, Stack } from 'react-native-router-flux';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  }
  return (
    <Provider store = {store} >
      <Router>
          <Scene key="root">
            <Scene key="loading" component={LoadingScreen}/>
            <Scene key="welcome" component={WelcomeScreen} title="Welcome" />
            <Scene key="registration" component={RegistrationScreen} title="Registration" />
            <Scene key="profile" component={MyProfileScreen} title="Profile"/>
            <Scene key="teamRegistration" component={TeamRegistration} title="Team Registration"/>
          </Scene>
      </Router>
    </Provider>
  );
}
