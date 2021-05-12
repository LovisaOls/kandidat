import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Modalize } from "react-native-modalize";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../actions/index";
import TopMenu from "./TopMenu";
import Icon from "react-native-vector-icons/Ionicons";

export default function Schedule() {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const [activeEvent, setActiveEvent] = useState(null);
  const events = useSelector((state) => state.scheduleEvents);
  const { teamMembers } = useSelector((state) => state.currentTeams);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents(activeTeam.teamId));
  }, [dispatch]);

  const modalRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;

  const onOpen = (item) => {
    const modal = modalRef.current;
    setActiveEvent(item);
    if (modal) {
      modal.open();
    }
  };

  let structuredEvents = {};

  function structureEvents() {
    if (events != undefined) {
      {
        Object.keys(events).forEach((eventId) => {
          structuredEvents[Object.keys(events[eventId].eventDetails)] =
            Object.values(events[eventId].eventDetails);
        });
      }
    }
  }

  function renderItems(item) {
    return (
      <View>
        <TouchableOpacity style={styles.eventList} onPress={() => onOpen(item)}>
          <View style={styles.eventHeader}>
            <View style={{ width: "80%" }}>
              <Text style={styles.eventTitle}>{item.title}</Text>
            </View>
            <Text style={styles.eventTime}>{item.time}</Text>
          </View>
          <Text style={styles.eventDescription}>{item.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  structureEvents();

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu />
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <TouchableOpacity
          style={styles.smallBtn}
          onPress={() => Actions.CreateEventSchedule()}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Agenda
        theme={{
          "stylesheet.agenda.main": {
            weekdays: {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 0,
              marginLeft: 15,
              marginRight: 15,
              paddingTop: 15,
              paddingBottom: 7,
              backgroundColor: "green",
            },
          },
        }}
        pastScrollRange={12}
        futureScrollRange={12}
        items={structuredEvents}
        renderItem={renderItems}
        selected={Date()}
        firstDay={1}
      />
      <Modalize ref={modalRef} snapPoint={500} modalHeight={screenHeight * 0.8}>
        <View style={styles.modal}>
          {activeEvent != null ? (
            <View>
              <View style={styles.modalEvents}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.modalTitle}>{activeEvent.title}</Text>
                  <View style={styles.type}>
                    <Text style={styles.typeText}>{activeEvent.type}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name="calendar-outline"
                    size={20}
                    color="#A247D4"
                  ></Icon>
                  <Text style={styles.date}>{activeEvent.date}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name="time-outline" size={20} color="#A247D4"></Icon>
                  <Text style={styles.time}>{activeEvent.time}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name="pin-outline" size={20} color="#A247D4"></Icon>
                  <Text style={styles.place}>{activeEvent.place}</Text>
                </View>
                <Text style={{ fontWeight: "bold" }}> Event Description</Text>
                <Text style={styles.description}>
                  {activeEvent.description}
                </Text>
              </View>

              <Text style={styles.subTitle}>Going</Text>
              <ScrollView horizontal={true}>
                {Object.keys(teamMembers).map((userId) => {
                  return events[activeEvent.id].participants[
                    teamMembers[userId].id
                  ] == true ? (
                    <View style={styles.modalUser}>
                      {teamMembers[userId].profilePicture != undefined ? (
                        <Image
                          source={{
                            uri: teamMembers[userId].profilePicture,
                          }}
                          style={styles.image}
                        />
                      ) : null}
                      <Text>
                        {teamMembers[userId].firstName}{" "}
                        {teamMembers[userId].lastName}
                      </Text>
                    </View>
                  ) : null;
                })}
              </ScrollView>

              <Text style={styles.subTitle}>Not Going</Text>
              <ScrollView horizontal={true}>
                {Object.keys(teamMembers).map((userId) => {
                  return events[activeEvent.id].participants[
                    teamMembers[userId].id
                  ] == false ? (
                    <View style={styles.modalUser}>
                      {teamMembers[userId].profilePicture != undefined ? (
                        <Image
                          source={{
                            uri: teamMembers[userId].profilePicture,
                          }}
                          style={styles.image}
                        />
                      ) : null}
                      <Text>
                        {teamMembers[userId].firstName}{" "}
                        {teamMembers[userId].lastName}
                      </Text>
                    </View>
                  ) : null;
                })}
              </ScrollView>
              <Text style={styles.subTitle}>Pending</Text>
              <ScrollView horizontal={true}>
                {Object.keys(teamMembers).map((userId) => {
                  return events[activeEvent.id].participants[
                    teamMembers[userId].id
                  ] == "pending" ? (
                    <View style={styles.modalUser}>
                      {teamMembers[userId].profilePicture != undefined ? (
                        <Image
                          source={{
                            uri: teamMembers[userId].profilePicture,
                          }}
                          style={styles.image}
                        />
                      ) : null}
                      <Text>
                        {teamMembers[userId].firstName}{" "}
                        {teamMembers[userId].lastName}
                      </Text>
                    </View>
                  ) : null;
                })}
              </ScrollView>
            </View>
          ) : null}
        </View>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  eventList: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 30,
    borderLeftWidth: 2,
    borderLeftColor: "green",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalEvents: {
    padding: 20,
    margin: 1,
    padding: 15,
    paddingLeft: 10,
  },
  infoBox: {
    width: "97%",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    alignItems: "flex-start",
    padding: 5,
    marginLeft: 9,
  },
  dateTimeBox: {
    marginLeft: 9,
    borderRadius: 10,
    alignItems: "flex-start",
    padding: 5,
  },
  date: {
    fontSize: 16,
    color: "#333",
    margin: 5,
  },
  time: {
    fontSize: 16,
    color: "#333",
    margin: 5,
  },
  place: {
    fontSize: 16,
    color: "#333",
    margin: 5,
  },
  modal: {
    justifyContent: "center",
  },
  eventTitle: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  smallBtn: {
    width: "15%",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    marginLeft: 40,
  },
  emptyDate: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    width: "75%",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  modalUser: {
    padding: 5,
    marginVertical: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#DDDDDD",
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  type: {
    backgroundColor: "green",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  typeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    color: "#333",
    margin: 5,
  },
});
