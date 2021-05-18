import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { fetchEvents } from "../../actions/index";
import "firebase/database";
require("firebase/auth");
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

const ParticipationRequests = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents(activeTeam.teamId));
  }, [dispatch]);
  const currentUser = useSelector((state) => state.currentUser);
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const events = useSelector((state) => state.scheduleEvents);
  const date = new Date();
  const today =
    date.getFullYear() +
    "-" +
    ("0" + parseInt(date.getMonth() + 1)).slice(-2) +
    "-" +
    date.getDate();
  const screenHeight = Dimensions.get("window").height;

  const onAcceptPressed = (eventId) => {
    firebase
      .database()
      .ref(`/events/${eventId}/participants/${currentUser.id}`)
      .set(true);
  };
  const onDeclinePressed = (eventId) => {
    firebase
      .database()
      .ref(`/events/${eventId}/participants/${currentUser.id}`)
      .set(false);
  };
  return (
    <View>
      <Text style={styles.title}>Participation Requests</Text>
      <ScrollView style={{ maxHeight: screenHeight * 0.45 }}>
        {events &&
          Object.keys(events).map((eventId, key) => {
            return events[eventId].participants != undefined &&
              events[eventId].participants[currentUser.id] == "pending"
              ? Object.keys(events[eventId].eventDetails).map((date) => {
                  return date >= today ? (
                    <View key={key} style={styles.requestBox}>
                      <View style={{ width: "75%" }}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View style={styles.eventType}>
                            <Text style={styles.eventTypeText}>
                              {events[eventId].eventDetails[date].type}
                            </Text>
                          </View>
                          <Text style={styles.eventTitle}>
                            {events[eventId].eventDetails[date].title}
                          </Text>
                        </View>
                        <Text style={styles.eventDate}>{date}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => onAcceptPressed(eventId)}
                        >
                          <Icon
                            name="checkmark-circle-sharp"
                            size={30}
                            color="#007E34"
                          ></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => onDeclinePressed(eventId)}
                        >
                          <Icon
                            name="close-circle-sharp"
                            size={30}
                            color="#FF6347"
                          ></Icon>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null;
                })
              : null;
          })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  name: {
    fontSize: 20,
  },
  requestBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 5,
    padding: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
  },
  buttons: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "left",
    fontWeight: "bold",
    margin: 10,
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
    margin: 5,
  },
  eventDate: {
    fontSize: 14,
    marginVertical: 5,
  },
  eventType: {
    backgroundColor: "#007E34",
    borderRadius: 5,
    padding: 5,
  },
  eventTypeText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
  },
});

export default ParticipationRequests;
