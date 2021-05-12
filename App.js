import firebase from "firebase/app";
import * as React from "react";
import {} from "react-native";
import config from "./Firebase/config";
import Home from "./Screens/HomeScreen/Home";
import MyProfileScreen from "./Screens/ProfileScreen/MyProfileScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import TacticsCoach from "./Screens/TacticsCoach";
import WelcomeScreen from "./Screens/WelcomeScreen";
import Schedule from "./Screens/Schedule";
import TeamRegistration from "./Screens/TeamRegistration";
import LoadingScreen from "./Screens/LoadingScreen";
import Settings from "./Screens/Settings";
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

const iconHome = () => <Icon name="ios-home-outline" size={30}></Icon>;

const iconFeed = () => (
  <Icon name="ios-chatbox-ellipses-outline" size={30}></Icon>
);
const iconCalendar = () => <Icon name="ios-calendar-outline" size={30}></Icon>;

const iconTactic = () => <Icon name="ios-football" size={30}></Icon>;

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  }
  return (
    <Provider store={store}>
      <Router>
        <Stack>
          <Scene key="root" hideNavBar={true} gesturesEnabled={false}>
            <Scene key="Loading" component={LoadingScreen} />
            <Scene
              key="BottomMenu"
              tabs={true}
              activeTintColor="#A247D4"
              hideNavBar={true}
            >
              <Scene
                key="Home"
                component={Home}
                hideNavBar={true}
                title="Home"
                icon={iconHome}
              />
              <Scene
                key="feed"
                component={Feed}
                hideNavBar={true}
                title="Feed"
                icon={iconFeed}
              />
              <Scene
                key="Schedule"
                hideNavBar={true}
                title="Schedule"
                component={Schedule}
                icon={iconCalendar}
              />
              <Scene
                key="TacticsCoach"
                hideNavBar={true}
                title="Tactics"
                component={CreateTactic}
                icon={iconTactic}
              />
            </Scene>
            <Scene key="Schedule" component={Schedule} />
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
            <Scene key="Home" component={Home} />
            <Scene key="Settings" component={Settings} />
            <Scene key="CreateFeed" component={CreateFeed} />
            <Scene key="Feed" component={Feed} />
            <Scene key="TacticsCoach" component={TacticsCoach} />
            <Scene key="CreateEventSchedule" component={CreateEventSchedule} />
            <Scene key="CreateTactic" component={CreateTactic} />
          </Scene>
        </Stack>
      </Router>
    </Provider>
  );
}
