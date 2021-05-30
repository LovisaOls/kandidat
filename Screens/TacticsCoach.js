import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import Draggable from "react-native-draggable";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";
import { fetchTactics, removeTactic } from "../actions/indexTactic";
import { Modalize } from "react-native-modalize";
import TopMenu from "./TopMenu";
import Icon from "react-native-vector-icons/Ionicons";

export default function TacticsCoach() {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const { teamMembers } = useSelector((state) => state.currentTeams);

  const currentUser = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTactics(activeTeam.teamId));
  }, [dispatch]);

  const tactics = useSelector((state) => state.lineUpTactics);
  const [activeTactic, setActiveTactic] = useState("");
  const modalRef = useRef(null);
  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  const onTacticPressed = (tactic) => {
    setActiveTactic(tactic.tacticId);
    const modal = modalRef.current;
    modal.close();
  };

  const deleteTactic = (tactic) => {
    if (tactic.tacticId == activeTactic) {
      setActiveTactic("");
      dispatch(removeTactic(tactic.tacticId));
    } else {
      dispatch(removeTactic(tactic.tacticId));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu />

      <View style={styles.theHeader}>
        <View style={styles.titleHeader}>
          {activeTeam.members[currentUser.id] == "coach" ? (
            <>
              <Text style={styles.coachTitle}>Tactics</Text>
              <TouchableOpacity
                style={styles.smallBtn}
                onPress={() => Actions.CreateTactic()}
              >
                <Text style={styles.buttonText}> + </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.coachTitle}>Tactics</Text>
          )}
        </View>

        <View style={styles.chooseTitle}>
          <Text style={styles.tacticTitleText}>
            {activeTactic && tactics[activeTactic].title}
          </Text>
          <TouchableOpacity onPress={() => onOpen()}>
            <Text style={styles.chooseTacticText}> Choose Tactic </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.theField}>
        <ImageBackground
          source={require("../assets/field_1.png")}
          style={{
            flex: 1,
            align: "center",
          }}
        ></ImageBackground>
      </View>

      <View style={styles.bottomMenu}></View>

      {activeTactic && tactics[activeTactic] ? (
        <>
          {Object.keys(tactics[activeTactic].players).map((player) => {
            return (
              <Draggable
                x={
                  tactics[activeTactic] &&
                  tactics[activeTactic].players[player].xPosition *
                    screenWidth -
                    25
                }
                y={
                  tactics[activeTactic] &&
                  tactics[activeTactic].players[player].yPosition *
                    screenHeight -
                    15
                }
                disabled={true}
              >
                <View style={styles.players}>
                  {Object.keys(teamMembers).map((user) => {
                    return teamMembers[user].id == player ? (
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            teamMembers[user].firstName +
                              " " +
                              teamMembers[user].lastName
                          )
                        }
                      >
                        <Text style={styles.playerText}>
                          {teamMembers[user].firstName[0]}
                          {teamMembers[user].lastName[0]}
                        </Text>
                      </TouchableOpacity>
                    ) : null;
                  })}
                </View>
              </Draggable>
            );
          })}
        </>
      ) : null}

      {tactics ? (
        <>
          <Modalize
            ref={modalRef}
            snapPoint={500}
            modalHeight={screenHeight * 0.85}
          >
            <View style={styles.modal}>
              <Text style={styles.modalTitle}> Choose a tactic </Text>
              {Object.keys(tactics).map((i, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onTacticPressed(tactics[i])}
                  >
                    <View style={styles.viewTactics}>
                      <Text style={styles.modalTacticsText}>
                        {tactics[i].title}
                      </Text>
                      {activeTeam.members[currentUser.id] == "coach" ? (
                        <TouchableOpacity style={styles.trashIcon}>
                          <Icon
                            onPress={() => deleteTactic(tactics[i])}
                            name="ios-trash-outline"
                            size={20}
                          ></Icon>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Modalize>
        </>
      ) : null}
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

  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: screenHeight * 0.06,
  },

  coachTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },

  smallBtn: {
    width: "15%",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007E34",
    marginRight: 10,
  },

  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  chooseTitle: {
    height: screenHeight * 0.05,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    marginHorizontal: 10,
  },

  chooseTacticText: {
    fontSize: 16,
    color: "#A247D4",
    textAlign: "center",
    margin: 5,
  },
  tacticTitleText: {
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginLeft: 10,
  },

  theField: {
    height: screenHeight * 0.71,
    width: "100%",
    justifyContent: "center",
  },
  players: {
    height: screenWidth * 0.08,
    width: screenWidth * 0.08,
    borderRadius: (screenWidth * 0.08) / 2,
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
  },
  playerText: {
    color: "white",
    fontWeight: "bold",
  },

  modal: {
    padding: 20,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },

  modalTacticsText: {
    fontSize: 18,
  },

  viewTactics: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    margin: 2,
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  trashIcon: {
    justifyContent: "flex-end",
  },

  bottomMenu: {
    height: screenHeight * 0.05,
  },
});
