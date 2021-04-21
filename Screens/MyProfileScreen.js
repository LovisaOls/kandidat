import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function MyProfileScreen({ route, navigation }) {
  let { user } = route.params;
  console.log(user);

  /*     const onHomePressed = () => {
        navigation.navigate('CoachHome')
    };
    onPress={() => onHomePressed()}
 */

  return (
    <View style={styles.container}>
      <View style={styles.profileIcon}>
        <Image style={styles.image} source={require("../assets/Profile.png")} />
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
      </View>

      <View style={styles.teams}>
        <Text style={styles.teamsText}> My Teams </Text>
        <TouchableOpacity style={styles.addTeamBtn}>
          <Text style={styles.addTeam}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addedTeams}>
        <TouchableOpacity>
          <Text style={styles.addedTeamsText}>BrommaP</Text>
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

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    margin: 10,
  },

  topImage: {
    height: 40,
    width: 40,
  },

  profileIcon: {
    marginTop: 30,
    flexDirection: "row",
  },

  image: {
    marginBottom: 50,
    height: 100,
    width: 100,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
  },
  teams: {
    flexDirection: "row",
  },

  teamsText: {
    fontSize: 30,
  },

  addTeamBtn: {
    width: "15%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    marginLeft: 40,
  },
  addedTeams: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 30,
    borderStyle: "dashed",
    borderRadius: 1,
    borderColor: "green",
    borderWidth: 1,
  },

  addedTeamsText: {
    fontSize: 20,
    padding: 10,
  },
});
