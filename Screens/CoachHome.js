import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import TopMenu from "../Screens/TopMenu";
import { useSelector } from "react-redux";

export default function CoachHome() {
  const { activeTeam } = useSelector((state) => state.currentTeams);
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
          <Text style={styles.name}>
            {" "}
            Team members: {Object.keys(activeTeam.members).length}
          </Text>
          <Text style={styles.name}> Coaches: </Text>
        </View>
      </View>
      <View style={styles.viewMembers}>
        <TouchableOpacity style={styles.membersBtn}>
          <Text style={styles.membersText}> View Team Members </Text>
        </TouchableOpacity>
      </View>

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

  viewMembers: {},

  membersBtn: {
    width: "80%",
    marginBottom: 50,
    backgroundColor: "green",
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  membersText: {
    fontSize: 20,
    color: "white",
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
