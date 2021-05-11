import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Modalize } from "react-native-modalize";

import TopMenu from "./TopMenu";
import { useDispatch, useSelector, setState } from "react-redux";
import { Actions } from "react-native-router-flux";
import { fetchEvents } from "../actions/index";
import { FlatList } from "react-native-gesture-handler";

export default function Schedule() {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const [activeEvent, setActiveEvent] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents(activeTeam.teamId));
  }, [dispatch]);

  const events = useSelector((state) => state.scheduleEvents);

  const modalRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;

  const onOpen = (item) => {
    const modal = modalRef.current;
    setActiveEvent(item)

    if (modal) {
      modal.open();
    }
  };

  let structuredEvents = {};

  function structureEvents() {
    if (events != undefined) {
      {
        Object.keys(events).forEach((eventId) => {
          structuredEvents[
            Object.keys(events[eventId].eventDetails)
          ] = Object.values(events[eventId].eventDetails);
        });
      }
    }
  }

  function renderItems(item) {
    return (
      <View>
        <TouchableOpacity
          style={styles.eventList}
          onPress={() => onOpen(item)}
        >
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle}>{item.title}</Text>
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
      <Modalize
        ref={modalRef}
        snapPoint={500}
        modalHeight={screenHeight * 0.80}
      >
        <View style={styles.modal}>
          {activeEvent != null ? (
            <View style={styles.modalEvents}>
              <Text style={styles.title}>{activeEvent.title}</Text>
              <View style={styles.dateTimeBox}>
                <Text style={styles.time}>{activeEvent.time}</Text>
                <Text style={styles.date}>{activeEvent.date}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.type}>{activeEvent.type}</Text>
                <Text style={styles.place}>{activeEvent.place}</Text>
                <Text style={styles.description}>{activeEvent.description}</Text>
              </View>

            </View>)
            : (null)}
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
    fontSize: 12,
    color: "#333",
  },
  time: {
    fontSize: 12,
    color: "#333",
  },
  modal: {
    justifyContent: "center"
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
