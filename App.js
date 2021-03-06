import firebase from "firebase/app";
import * as React from "react";
import {} from "react-native";
import config from "./Firebase/config";
import Home from "./Screens/HomeScreen/Home";
import MyProfileScreen from "./Screens/ProfileScreen/MyProfileScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import TacticsCoach from "./Screens/TacticsCoach";
import WelcomeScreen from "./Screens/WelcomeScreen";
import Schedule from "./Screens/Schedule/Schedule";
import TeamRegistration from "./Screens/TeamRegistration";
import LoadingScreen from "./Screens/LoadingScreen";
import Settings from "./Screens/Settings";
import { Router, Scene, Stack, Tabs } from "react-native-router-flux";
import Feed from "./Screens/Feed/Feed";
import CreateEvent from "./Screens/Schedule/CreateEvent";
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
          <Scene key="root" headerShown={false} gestureEnabled={false}>
            <Scene key="Loading" component={LoadingScreen} />
            <Scene
              key="BottomMenu"
              tabs={true}
              activeTintColor="#A247D4"
              headerShown={false}
            >
              <Scene
                key="Home"
                component={Home}
                headerShown={false}
                title="Home"
                icon={iconHome}
              />
              <Scene
                key="feed"
                component={Feed}
                headerShown={false}
                title="Feed"
                icon={iconFeed}
              />
              <Scene
                key="Schedule"
                headerShown={false}
                title="Schedule"
                component={Schedule}
                icon={iconCalendar}
              />
              <Scene
                key="TacticsCoach"
                headerShown={false}
                title=" Tactics"
                component={TacticsCoach}
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
            <Scene key="Feed" component={Feed} />
            <Scene key="TacticsCoach" component={TacticsCoach} />
            <Scene key="CreateEvent" component={CreateEvent} />
            <Scene key="CreateTactic" component={CreateTactic} />
          </Scene>
        </Stack>
      </Router>
    </Provider>
  );
}
