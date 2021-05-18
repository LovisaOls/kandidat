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
import ParticipationRequests from "./ParticipationRequests";
import MemberBox from "./MemberBox";
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
    Clipboard.setString(
      "Hi! Join the team " +
        activeTeam.teamName +
        " in the MyTeam App! TeamId:" +
        activeTeam.teamId
    );
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
          <View style={styles.noImage}>
            <Icon name="image-outline" color="white" size={50}></Icon>
          </View>
        )}

        <View>
          <Text style={styles.teamName}>{activeTeam.teamName} </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Icon name="pin-outline" size={15} color="#A247D4"></Icon>
            <Text style={styles.place}>{activeTeam.city}</Text>
          </View>

          <TouchableOpacity style={styles.teamMemberBox} onPress={onOpen}>
            <View style={styles.teamMembersNrBox}>
              <Text style={styles.teamMembersNr}>
                {
                  teamMembers.filter(
                    (obj) => obj.teams[activeTeam.teamId] != false
                  ).length
                }
              </Text>
            </View>
            <Text style={styles.teamMembers}>Members</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!copied ? (
        <TouchableOpacity style={styles.copyBox} onPress={copyId}>
          <Text style={styles.copyText}> Copy Team Invitation</Text>
          <Icon name="copy-outline" size={20} color="#A247D4"></Icon>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.copyBox} onPress={copyId}>
          <Text style={styles.copyText}> Copied!</Text>
          <Icon name="checkmark-outline" size={20} color="#A247D4"></Icon>
        </TouchableOpacity>
      )}

      {activeTeam.members[currentUser.id] == "coach" ? (
        <MembershipRequests />
      ) : (
        <ParticipationRequests />
      )}

      <Modalize ref={modalRef} snapPoint={500} modalHeight={screenHeight * 0.8}>
        <View style={styles.modal}>
          <Text style={styles.title}> Team members </Text>
          {teamMembers &&
            Object.keys(teamMembers).map((user, i) => {
              return teamMembers[user].teams[activeTeam.teamId] != false ? (
                <MemberBox key={i} user={user} />
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
  title: {
    fontSize: 24,
    justifyContent: "center",
    fontWeight: "bold",
    margin: 10,
  },
  TeamInfoHeader: {
    marginHorizontal: 10,
    flexDirection: "row",
  },
  name: {
    fontSize: 18,
  },
  teamMembers: {
    fontSize: 16,
    fontWeight: "bold",
  },
  teamMembersNr: {
    fontSize: 30,
    color: "white",
  },
  teamMembersNrBox: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: (screenWidth * 0.15) / 2,
    backgroundColor: "#007E34",
    alignItems: "center",
    justifyContent: "center",
  },
  copyBox: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  copyText: {
    fontSize: 14,
    padding: 5,
  },
  teamMemberBox: {
    margin: 20,
    alignItems: "center",
  },
  modal: {
    padding: 20,
  },
  image: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  noImage: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  place: {
    fontSize: 16,
    color: "#333",
  },
  teamName: {
    fontSize: 18,
    marginLeft: 10,
  },
});
