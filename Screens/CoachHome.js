import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Clipboard,
} from "react-native";
//import Clipboard from "@react-native-clipboard/clipboard";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";
import TopMenu from "../Screens/TopMenu";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamMembers } from "../actions/index";

export default function CoachHome() {
  const screenHeight = Dimensions.get("window").height;
  const { activeTeam } = useSelector((state) => state.currentTeams);
  console.log("activeTeam", activeTeam);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeamMembers(activeTeam.teamId));
  }, [dispatch]);

  const { teamMembers } = useSelector((state) => state.currentTeams);
  console.log("teamMembers", teamMembers);

  const modalRef = useRef(null);

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  const copyId = () => Clipboard.setString(activeTeam.teamId);

  return (
    <SafeAreaView keyboardShouldPersistTaps="always" style={styles.container}>
      <TopMenu />

      <View style={styles.TeamInfoHeader}>
        <Image
          style={styles.image}
          source={require("../assets/TestTeamLogga.png")}
        />

        <View style={styles.TeamInfo}>
          <View style={styles.teamIdHeader}>
            <Text style={styles.name}> Team Id</Text>
            <TouchableOpacity onPress={copyId}>
              <Icon name="copy-outline" size={16} color="purple"></Icon>
            </TouchableOpacity>
          </View>
          <Text>{activeTeam.teamId}</Text>

          <View style={styles.memberBox}>
            <Text style={styles.name}>
              Team members: {Object.keys(teamMembers).length}
            </Text>
            <TouchableOpacity style={styles.viewButton} onPress={onOpen}>
              <Text style={styles.viewButtonText}> View </Text>
            </TouchableOpacity>
            <Text style={styles.name}> Coaches: </Text>
          </View>
        </View>
      </View>
      <View style={styles.MyMemberRequests}>
        <Text style={styles.title}> Membership Requests </Text>
        <View style={styles.TheBtns}>
          <Text style={styles.RequestsName}>Dolle</Text>
          <TouchableOpacity style={styles.AcceptBtn}>
            <Text style={styles.buttonText}> ✓ </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.DeclineBtn}>
            <Text style={styles.buttonText}> X </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.GameStats}>
        <Text style={styles.title}>Game Statistics</Text>
        <TouchableOpacity style={styles.smallBtn}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Modalize
        ref={modalRef}
        snapPoint={500}
        modalHeight={screenHeight * 0.85}
      >
        <View style={styles.modal}>
          <Text style={styles.title}> Team members </Text>
          {teamMembers &&
            Object.keys(teamMembers).map((key, i) => {
              return teamMembers[key].id == activeTeam.coach ? (
                <View key={i} style={styles.viewMembers}>
                  <View>
                    <Text>Coach!!!</Text>
                    <Text>
                      {teamMembers[key].firstName} {teamMembers[key].lastName}
                    </Text>
                  </View>
                  <Text>{teamMembers[key].email}</Text>
                </View>
              ) : (
                <View key={i} style={styles.viewMembers}>
                  <View>
                    <Text>
                      {teamMembers[key].firstName} {teamMembers[key].lastName}
                    </Text>
                  </View>
                  <Text>{teamMembers[key].email}</Text>
                </View>
              );
            })}
        </View>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /* ____________________________________________ */

  title: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    margin: 10,
  },
  TeamInfoHeader: {
    marginTop: 10,
    flexDirection: "row",
    margin: 10,
  },

  TeamInfo: {
    marginTop: 10,
    margin: 10,
  },

  image: {
    marginBottom: 20,
    height: 80,
    width: 80,
    margin: 10,
  },
  name: {
    fontSize: 18,
  },

  teamIdHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  /* _____________________________________________ */
  memberBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewButtonText: {
    color: "purple",
    fontSize: 18,
  },
  viewMembers: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    margin: 1,
    padding: 15,
  },
  modal: {
    padding: 20,
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

  /* _____________________________________________ */

  memberRequestsBox: {
    padding: 10,
    margin: 10,
  },

  TheRequests: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  RequestsName: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },

  TheBtns: {
    flexDirection: "row",
  },

  AcceptBtn: {
    width: "10%",
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    marginLeft: 10,
    marginTop: 10,
  },
  DeclineBtn: {
    width: "10%",
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    marginLeft: 10,
    marginTop: 10,
  },

  /* --------------------------------------------- */

  GameStats: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },

  /* --------------------------------------------- */
});
