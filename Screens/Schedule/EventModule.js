import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

const EventModule = ({ activeEvent }) => {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const events = useSelector((state) => state.scheduleEvents);
  const { teamMembers } = useSelector((state) => state.currentTeams);
  return (
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
              <Icon name="calendar-outline" size={20} color="#A247D4"></Icon>
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
            <Text style={styles.description}>{activeEvent.description}</Text>
          </View>
          {events[activeEvent.id].participants != undefined ? (
            <View>
              <Text style={styles.subTitle}>Going</Text>
              <ScrollView horizontal={true}>
                {Object.keys(teamMembers).map((userId, i) => {
                  return activeEvent != null &&
                    events[activeEvent.id].participants[
                      teamMembers[userId].id
                    ] == true ? (
                    <View style={styles.modalUser} key={i}>
                      {teamMembers[userId].profilePicture != undefined ? (
                        <Image
                          source={{
                            uri: teamMembers[userId].profilePicture,
                          }}
                          style={styles.image}
                        />
                      ) : (
                        <View style={styles.initialCircle}>
                          <Text style={styles.initialText}>
                            {teamMembers[userId].firstName[0]}
                            {teamMembers[userId].lastName[0]}
                          </Text>
                        </View>
                      )}
                      <Text style={styles.userName}>
                        {teamMembers[userId].firstName}{" "}
                        {teamMembers[userId].lastName}
                      </Text>
                    </View>
                  ) : null;
                })}
              </ScrollView>

              <Text style={styles.subTitle}>Not Going</Text>
              <ScrollView horizontal={true}>
                {Object.keys(teamMembers).map((userId, i) => {
                  return activeEvent != null &&
                    events[activeEvent.id].participants[
                      teamMembers[userId].id
                    ] == false ? (
                    <View style={styles.modalUser} key={i}>
                      {teamMembers[userId].profilePicture != undefined ? (
                        <Image
                          source={{
                            uri: teamMembers[userId].profilePicture,
                          }}
                          style={styles.image}
                        />
                      ) : (
                        <View style={styles.initialCircle}>
                          <Text style={styles.initialText}>
                            {teamMembers[userId].firstName[0]}
                            {teamMembers[userId].lastName[0]}
                          </Text>
                        </View>
                      )}
                      <Text style={styles.userName}>
                        {teamMembers[userId].firstName}{" "}
                        {teamMembers[userId].lastName}
                      </Text>
                    </View>
                  ) : null;
                })}
              </ScrollView>
              <Text style={styles.subTitle}>Pending</Text>
              <ScrollView horizontal={true}>
                {Object.keys(teamMembers).map((userId, i) => {
                  return activeEvent != null &&
                    events[activeEvent.id].participants[
                      teamMembers[userId].id
                    ] == "pending" ? (
                    <View style={styles.modalUser} key={i}>
                      {teamMembers[userId].profilePicture != undefined ? (
                        <Image
                          source={{
                            uri: teamMembers[userId].profilePicture,
                          }}
                          style={styles.image}
                        />
                      ) : (
                        <View style={styles.initialCircle}>
                          <Text style={styles.initialText}>
                            {teamMembers[userId].firstName[0]}
                            {teamMembers[userId].lastName[0]}
                          </Text>
                        </View>
                      )}
                      <Text style={styles.userName}>
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
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  modalEvents: {
    padding: 20,
    margin: 1,
    padding: 15,
    paddingLeft: 10,
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
    margin: 5,
    alignItems: "center",
  },
  userName: {
    fontSize: 12,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  initialCircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
    margin: 5,
  },
});
export default EventModule;
