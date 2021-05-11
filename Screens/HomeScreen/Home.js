import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Clipboard,
  Dimensions,
} from "react-native";

//import Clipboard from "@react-native-clipboard/clipboard";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";
import TopMenu from "../TopMenu";
import MembershipRequests from "./MembershipRequests";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamMembers } from "../../actions/index";

export default function Home() {
  const screenHeight = Dimensions.get("window").height;
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const currentUser = useSelector((state) => state.currentUser);
  const [copied, setCopied] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeamMembers(activeTeam.teamId));
  }, [dispatch]);
  const { teamMembers } = useSelector((state) => state.currentTeams);

  const modalRef = useRef(null);

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  const copyId = () => {
    Clipboard.setString(activeTeam.teamId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <SafeAreaView keyboardShouldPersistTaps="always" style={styles.container}>
      <TopMenu />
      <View style={styles.TeamInfoHeader}>
        {activeTeam.teamPicture ? (
          <Image
            source={{ uri: activeTeam.teamPicture }}
            style={styles.image}
          ></Image>
        ) : (
          <Icon name="image-outline" size={100}></Icon>
        )}

        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.teamIdTitle}>Team: </Text>
            <Text>{activeTeam.teamName}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.teamIdTitle}>City: </Text>
            <Text>{activeTeam.city}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.memberBox} onPress={onOpen}>
              <View style={styles.teamMembersNrBox}>
                <Text style={styles.teamMembersNr}>
                  {
                    teamMembers.filter(
                      (obj) => obj.teams[activeTeam.teamId] === true
                    ).length
                  }
                </Text>
              </View>
              <Text style={styles.teamMembers}>Team members</Text>
            </TouchableOpacity>

            {!copied ? (
              <TouchableOpacity style={styles.teamIdHeader} onPress={copyId}>
                <Icon name="copy-outline" size={28} color="#A247D4"></Icon>
                <Text style={styles.teamIdTitle}> Copy TeamId</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.teamIdHeader} onPress={copyId}>
                <Icon name="checkmark-outline" size={28} color="#A247D4"></Icon>
                <Text style={styles.teamIdTitle}> Copied!</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {activeTeam.coach == currentUser.id ? (
        <View style={styles.MyMemberRequests}>
          <MembershipRequests />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Participation Requests</Text>
          <Text> You don't have any requests right now! </Text>
        </View>
      )}

      <Modalize
        ref={modalRef}
        snapPoint={500}
        modalHeight={screenHeight * 0.80}
      >
        <View style={styles.modal}>
          <Text style={styles.title}> Team members </Text>
          {teamMembers &&
            Object.keys(teamMembers).map((key, i) => {
              return teamMembers[key].teams[activeTeam.teamId] == true ? (
                <View key={i} style={styles.viewMembers}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {teamMembers[key].profilePicture ? (
                      <Image
                        source={{ uri: teamMembers[key].profilePicture }}
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: 25,
                          marginRight: 10,
                        }}
                      />
                    ) : (
                      <Icon name="person-circle-outline" size={45}></Icon>
                    )}
                    <View>
                      <Text style={styles.nameTeamMember}>
                        {teamMembers[key].firstName} {teamMembers[key].lastName}
                      </Text>
                      <Text>{teamMembers[key].email}</Text>
                    </View>
                  </View>
                </View>
              ) : null;
            })}
        </View>
      </Modalize>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  /* ____________________________________________ */

  title: {
    fontSize: 24,
    justifyContent: "center",
    fontWeight: "bold",
    margin: 10,
  },
  TeamInfoHeader: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  teamMembers: {
    fontSize: 16,
    fontWeight: "bold",
  },
  teamMembersNr: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  teamMembersNrBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  teamIdTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  teamIdHeader: {
    alignItems: "center",
    justifyContent: "center",
  },
  /* _____________________________________________ */
  memberBox: {
    alignItems: "center",
  },
  viewMembers: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
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
  nameTeamMember: {
    fontWeight: "bold",
    fontSize: 14,
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
  image: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
