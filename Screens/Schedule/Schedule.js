import React, { useRef, useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../actions/index";
import TopMenu from "../TopMenu";
import EventModule from "./EventModule";
import Icon from "react-native-vector-icons/Ionicons";
import { removeEvent } from "../../actions/index";

export default function Schedule() {
  const [activeEvent, setActiveEvent] = useState(null);
  const events = useSelector((state) => state.scheduleEvents);
  const modalRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;
  const currentUser = useSelector((state) => state.currentUser);
  const { activeTeam } = useSelector((state) => state.currentTeams);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents(activeTeam.teamId));
  }, [dispatch]);

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

  const deleteEvent = (event) => {
    dispatch(removeEvent(event.eventId));
  };

  function renderItems(item) {
    // Funkar inte att ha loopen här för att se om eventsen är unika, den skriver över eventen redan innan
    return (
      <View>
        <TouchableOpacity style={styles.eventList} onPress={() => onOpen(item)}>
          <View style={styles.eventHeader}>
            <View style={{ width: "80%" }}>
              <Text style={styles.eventTitle}>{item.title}</Text>
            </View>
            {activeTeam.coach == currentUser.id ? (
              <Icon
                name="ios-trash-outline"
                size={30}
                onPress={() => deleteEvent(item)}
              ></Icon>
            ) : null}
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
        {activeTeam.coach == currentUser.id ? (
          <TouchableOpacity
            style={styles.smallBtn}
            onPress={() => Actions.CreateEventSchedule()}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        ) : null}
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
        renderEmptyData={() => null}
      />
      <Modalize ref={modalRef} snapPoint={500} modalHeight={screenHeight * 0.8}>
        <EventModule activeEvent={activeEvent} />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  type: {
    backgroundColor: "green",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    margin: 5,
  },
});
