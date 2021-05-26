import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  fetchEvents,
  declineParticipation,
  acceptParticipation,
} from "../../actions/indexSchedule";

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
    dispatch(acceptParticipation(eventId, currentUser.id));
  };
  const onDeclinePressed = (eventId) => {
    dispatch(declineParticipation(eventId, currentUser.id));
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
                    <View
                      key={key}
                      style={[
                        styles.requestBox,
                        {
                          borderLeftColor:
                            events[eventId].eventDetails[date].type == "game"
                              ? "#007E34"
                              : events[eventId].eventDetails[date].type ==
                                "practice"
                              ? "#A247D4"
                              : events[eventId].eventDetails[date].type ==
                                "other"
                              ? "#FF6347"
                              : null,
                        },
                      ]}
                    >
                      <View style={{ width: "50%" }}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={styles.eventTitle}>
                            {events[eventId].eventDetails[date].title}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.eventDate}>{date} </Text>
                          <Text style={styles.eventDate}>
                            {events[eventId].eventDetails[date].time}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          style={[styles.editButton, { width: null }]}
                          onPress={() => onAcceptPressed(eventId)}
                        >
                          <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.buttonSkip, { width: null }]}
                          onPress={() => onDeclinePressed(eventId)}
                        >
                          <Text style={styles.textStyleSkip}>Decline</Text>
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
    margin: 1,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 0.25,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleSkip: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonSkip: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#DDDDDD",
    margin: 5,
    width: "40%",
    justifyContent: "center",
  },
  editButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#007E34",
    margin: 5,
    width: "40%",
    justifyContent: "center",
  },
});

export default ParticipationRequests;
