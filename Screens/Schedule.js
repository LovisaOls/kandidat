import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Modalize } from "react-native-modalize";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../actions/index";
import TopMenu from "./TopMenu";

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
    console.log("pop up meny", item);
    const modal = modalRef.current;
    setActiveEvent(item);
    console.log("activeeee", activeEvent);
    console.log(teamMembers);
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
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventTime}>{item.time}</Text>
          </View>
          <Text style={styles.eventDescription}>{item.description}</Text>
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
          <Text style={styles.title}>Event Information</Text>
          {activeEvent != null ? (
            <View>
              <View style={styles.modalEvents}>
                <Text style={styles.eventTitle}>{activeEvent.title}</Text>
                <Text style={styles.time}>{activeEvent.time}</Text>
                <Text style={styles.type}>{activeEvent.type}</Text>
                <Text style={styles.place}>{activeEvent.place}</Text>
                <Text style={styles.description}>
                  {activeEvent.description}
                </Text>
              </View>
              <Text style={styles.title}>Pending</Text>
              {Object.keys(teamMembers).map((userId) => {
                return events[activeEvent.id].participants[
                  teamMembers[userId].id
                ] == "pending" ? (
                  <View>
                    <Text>
                      {teamMembers[userId].firstName}{" "}
                      {teamMembers[userId].lastName}
                    </Text>
                  </View>
                ) : null;
              })}
              <Text style={styles.title}>Coming</Text>
              {Object.keys(teamMembers).map((userId) => {
                return events[activeEvent.id].participants[
                  teamMembers[userId].id
                ] == true ? (
                  <View>
                    <Text>
                      {teamMembers[userId].firstName}{" "}
                      {teamMembers[userId].lastName}
                    </Text>
                  </View>
                ) : null;
              })}
              <Text style={styles.title}>Not Coming</Text>
              {Object.keys(teamMembers).map((userId) => {
                return events[activeEvent.id].participants[
                  teamMembers[userId].id
                ] == false ? (
                  <View>
                    <Text>
                      {teamMembers[userId].firstName}{" "}
                      {teamMembers[userId].lastName}
                    </Text>
                  </View>
                ) : null;
              })}
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
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    margin: 1,
    padding: 15,
    paddingLeft: 10,
  },
  time: {
    fontSize: 12,
    color: "#333",
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
});
