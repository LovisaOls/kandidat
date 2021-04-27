import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";

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

  return (
    <View style={styles.container}>
      <TopMenu />

      <View style={styles.TeamInfoHeader}>
        <Image
          style={styles.image}
          source={require("../assets/TestTeamLogga.png")}
        />

        <View style={styles.TeamInfo}>
          <Text style={styles.name}> Team ID: {activeTeam.teamId}</Text>

          <View style={styles.memberBox}>
            <Text style={styles.name}>
              {" "}
              Team members: {Object.keys(teamMembers).length}
            </Text>
            <TouchableOpacity style={styles.viewButton} onPress={onOpen}>
              <Text style={styles.viewButtonText}> View </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.name}> Coaches: </Text>
        </View>
      </View>
      {/*  <View style={styles.viewMembers}>
        <TouchableOpacity style={styles.membersBtn}>
          <Text style={styles.membersText}> View Team Members </Text>
        </TouchableOpacity>
      </View> */}

      <SafeAreaView style={styles.MyMemberRequests}>
        <Text style={styles.TheRequests}> Membership Requests </Text>
        <View style={styles.TheBtns}>
          <Text style={styles.RequestsName}>Dolle</Text>
          <TouchableOpacity style={styles.AcceptBtn}>
            <Text style={styles.Accept}> ✓ </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.DeclineBtn}>
            <Text style={styles.Decline}> X </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.GameStats}>
        <Text style={styles.StatsText}>GameStatistics</Text>
        <TouchableOpacity style={styles.addStatsBtn}>
          <Text style={styles.addStats}>+</Text>
        </TouchableOpacity>
      </View>
      <>
        <Modalize
          ref={modalRef}
          snapPoint={500}
          modalHeight={screenHeight * 0.8}
        >
          <View style={styles.modal}>
            <Text style={styles.title}> Team members </Text>
            {teamMembers &&
              Object.keys(teamMembers).map((key) => {
                return teamMembers[key].id == activeTeam.coach ? (
                  <View style={styles.viewMembers}>
                    <View>
                      <Text>Coach!!!</Text>
                      <Text>
                        {teamMembers[key].firstName} {teamMembers[key].lastName}
                      </Text>
                    </View>
                    <Text>{teamMembers[key].email}</Text>
                  </View>
                ) : (
                  <View style={styles.viewMembers}>
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
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  /* ____________________________________________ */

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  TeamInfoHeader: {
    marginTop: 10,
    flexDirection: "row",
  },

  TeamInfo: {
    marginTop: 10,
    marginLeft: 20,
    flexDirection: "column",
  },

  image: {
    marginBottom: 20,
    height: 80,
    width: 80,
  },
  name: {
    fontSize: 18,
  },
  /* _____________________________________________ */
  memberBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  membersText: {
    fontSize: 20,
    color: "white",
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewButtonText: {
    color: "purple",
    fontSize: 20,
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

  /* _____________________________________________ */

  MyMemberRequests: {
    borderStyle: "dashed",
    borderRadius: 1,
    borderColor: "green",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },

  TheRequests: {
    fontSize: 20,
    fontWeight: "bold",
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
    borderStyle: "dashed",
    borderRadius: 1,
    borderColor: "green",
    borderWidth: 1,
    flexDirection: "row",
  },

  StatsText: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },

  addStatsBtn: {
    width: "10%",
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    marginLeft: 50,
    marginTop: 10,
  },

  /* --------------------------------------------- */
});
