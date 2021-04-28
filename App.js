import firebase from "firebase/app";
import * as React from "react";
import {} from "react-native";
import config from "./Firebase/config";
import CoachHome from "./Screens/CoachHome";
import MyProfileScreen from "./Screens/ProfileScreen/MyProfileScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import TacticsCoach from "./Screens/TacticsCoach";
import WelcomeScreen from "./Screens/WelcomeScreen";
import TestSchedule from "./Screens/TestSchedule";
import TeamRegistration from "./Screens/TeamRegistration";
import LoadingScreen from "./Screens/LoadingScreen";
import Settings from "./Screens/Settings";
import CreateComment from "./Screens/CreateComment"
import { Router, Scene, Stack, Tabs } from "react-native-router-flux";
import CreateFeed from "./Screens/CreateFeed";
import Feed from "./Screens/Feed";
import CreateEventSchedule from "./Screens/CreateEventSchedule";
import CreateTactic from "./Screens/CreateTactic";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import Icon from "react-native-vector-icons/Ionicons";

const store = createStore(rootReducer, applyMiddleware(thunk));

const iconHome = () => <Icon name="ios-home" size={34}></Icon>;

const iconFeed = () => (
  <Icon name="ios-chatbox-ellipses-outline" size={34}></Icon>
);

const iconCalendar = () => <Icon name="ios-calendar-outline" size={34}></Icon>;

const iconTactic = () => <Icon name="ios-football" size={34}></Icon>;

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  }
  return (
    <Provider store={store}>
      <Router>
        <Stack>
          <Scene key="root" hideNavBar={true}>
            <Scene key="Loading" component={LoadingScreen} />
            <Scene
              key="BottomMenu"
              tabs={true}
              activeTintColor="#A247D4"
              hideNavBar={true}
            >
              <Scene
                key="coachHome"
                component={CoachHome}
                hideNavBar={true}
                title=" Home"
                icon={iconHome}
              />
              <Scene
                key="feed"
                component={Feed}
                hideNavBar={true}
                title=" Feed"
                icon={iconFeed}
              />
              <Scene
                key="settings"
                hideNavBar={true}
                title="Schedule"
                component={TestSchedule}
                icon={iconCalendar}
              />
              <Scene
                key="TacticsCoach"
                hideNavBar={true}
                title=" Tactics"
                component={CreateTactic}
                icon={iconTactic}
              />
            </Scene>

            {/* loading måste ligga överst */}
            <Scene key="TestSchedule" component={TestSchedule} />
            <Scene key="Welcome" component={WelcomeScreen} title="Welcome" />
            <Scene
              key="Registration"
              component={RegistrationScreen}
              title="Registration"
            />
            <Scene key="Profile" component={MyProfileScreen} title="Profile" />
            <Scene
              key="TeamRegistration"
              component={TeamRegistration}
              title="Team Registration"
            />
            <Scene key="CoachHome" component={CoachHome} />
            <Scene key="Settings" component={Settings} />
            <Scene key="CreateFeed" component={CreateFeed} />
            <Scene key="Feed" component={Feed} />
            <Scene key="TacticsCoach" component={TacticsCoach} />
            <Scene key="CreateEventSchedule" component={CreateEventSchedule} />
            <Scene key="Comment" component={CreateComment} />
          </Scene>
        </Stack>
      </Router>
    </Provider>
  );
}
