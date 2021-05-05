import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Agenda } from "react-native-calendars";
import TopMenu from "./TopMenu";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";
import { fetchEvents } from "../actions/index";

export default function Schedule() {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents(activeTeam.teamId));
  }, [dispatch]);

  const events = useSelector((state) => state.scheduleEvents);

  function renderItems(item) {
    return (
      <TouchableOpacity
        style={styles.hej}
        onPress={() => Alert.alert(item.description)}
      >
        <Text>{item.title}</Text>
        <Text>{item.time}</Text>
        <Text>{item.description}</Text>
      </TouchableOpacity>
    );
  }

  function rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

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
            /* dotColor: "purple",
          selectedDotColor: "purple", */
          },
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={12}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={12}
        items={structuredEvents}
        renderItem={renderItems}
        selected={Date()}
        firstDay={1}
        //rowHasChanged={rowHasChanged()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hej: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
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
