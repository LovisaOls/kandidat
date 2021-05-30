import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  Alert,
  Modal,
} from "react-native";
import { createTactic } from "../actions/indexTactic";
import TopMenu from "../Screens/TopMenu";
import { Actions } from "react-native-router-flux";
import DraggablePlayer from "./DraggablePlayer";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

export default function CreateTactic() {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const { teamMembers } = useSelector((state) => state.currentTeams);

  const [title, setTitle] = useState("");
  const [allPlayerInfo, setAllPlayersInfo] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [alreadyPlaced, setAlreadyPlaced] = useState([]);

  console.log("already placed", alreadyPlaced);
  console.log("allPlayers", allPlayers);

  const setPlayerInfo = (player, xPosition, yPosition) => {
    allPlayerInfo[teamMembers[player].id] = {
      playerId: teamMembers[player].id,
      xPos: xPosition,
      yPos: yPosition,
    };
  };
  const addPlayer = (user) => {
    allPlayers.push(
      <DraggablePlayer
        key={teamMembers[user].id}
        player={user}
        setPlayerInfo={setPlayerInfo}
      />
    );
  };

  const openModal = (nr) => {
    setModalVisible(!modalVisible);
  };

  const dispatch = useDispatch();
  const onCreateLineUp = () => {
    dispatch(createTactic(activeTeam, title, allPlayerInfo));
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu />

      <View style={styles.theHeader}>
        <View style={styles.saveTeamHeader}>
          {title ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => onCreateLineUp()}
            >
              <Text style={styles.buttonTitle}> Save Team </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                Alert.alert("You need to name the tactic with a title")
              }
            >
              <Text style={styles.buttonTitle}> Save Team </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.cancel}>
          <TouchableOpacity onPress={() => Actions.TacticsCoach()}>
            <Text style={styles.cancelText}> Cancel </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => openModal()}
            >
              <Text style={{ color: "#A247D4", fontSize: 16, padding: 5 }}>
                Add Player
              </Text>
              <Icon name="add-circle-outline" size={16} color="#A247D4"></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
          </View>
        </View>
      </View>
      <View style={styles.theField}>
        <ImageBackground
          source={require("../assets/field_1.png")}
          style={{
            flex: 1,
            align: "center",
          }}
        >
          <View>{allPlayers}</View>
        </ImageBackground>
      </View>
      <View style={styles.bottomMenu}></View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => openModal()}
        >
          <View style={styles.modalView}>
            <Text style={styles.title}>Choose Player</Text>
            <ScrollView>
              {teamMembers &&
                Object.keys(teamMembers).map((user, i) => {
                  return teamMembers[user].teams[activeTeam.teamId] == true &&
                    alreadyPlaced.indexOf(teamMembers[user].id) == -1 ? (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        alreadyPlaced.push(teamMembers[user].id);
                        addPlayer(user);
                        openModal();
                      }}
                      style={styles.playerBox}
                    >
                      <Text style={styles.playerName}>
                        {teamMembers[user].firstName}{" "}
                        {teamMembers[user].lastName}
                      </Text>
                    </TouchableOpacity>
                  ) : null;
                })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
  },

  theHeader: {
    height: screenHeight * 0.11,
  },

  saveTeamHeader: {
    height: screenHeight * 0.045,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    fontWeight: "bold",
    margin: 10,
  },

  button: {
    backgroundColor: "#007E34",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: "70%",
  },

  buttonTitle: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },

  cancel: {
    height: screenHeight * 0.02,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontSize: 14,
    color: "#A247D4",
    textAlign: "center",
  },

  inputView: {
    height: screenHeight * 0.045,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.7,
  },

  input: {
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    paddingLeft: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: "80%",
  },

  players: {
    backgroundColor: "red",
    padding: 6,
    borderRadius: 15,
  },
  playerBox: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    margin: 2,
    padding: 15,
  },

  theField: {
    height: screenHeight * 0.71,
    width: "100%",
    justifyContent: "center",
  },

  bottomMenu: {
    height: screenHeight * 0.05,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.7,
  },
  playerName: {
    fontSize: 16,
  },
});
