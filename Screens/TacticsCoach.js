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
} from "react-native";
import Draggable from "react-native-draggable"; // first, run "npm run source" to get Draggable.js
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";
import { fetchTactics } from "../actions/index";
import { Modalize } from "react-native-modalize";
import TopMenu from "./TopMenu";
import Icon from "react-native-vector-icons/Ionicons";
import { removeTactic } from "../actions/index";

export default function TacticsCoach() {
  const { activeTeam } = useSelector((state) => state.currentTeams);
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
    modal.close()
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
          <TouchableOpacity onPress={() => onOpen()}>
            <Text style={styles.chooseTacticText}> CHOOSE TACTIC </Text>
          </TouchableOpacity>
          <Text style={styles.tacticTitleText}>
            {activeTactic && tactics[activeTactic].title}
          </Text>
        </View>

{/*         <View style={styles.tacticTitle}>
          <Text style={styles.tacticTitleText}>
            {activeTactic && tactics[activeTactic].title}
          </Text>
        </View> */}
      </View>

      <View style={styles.theField}>
        <ImageBackground
          source={require("../assets/field_1.png")}
          style={{
            flex: 1,
            align: 'center'
          }}
        ></ImageBackground>
      </View>

      <View style={styles.bottomMenu}>
      </View>

      {activeTactic && tactics ? (
        <>
          <Draggable
            x={
              activeTactic &&
              tactics[activeTactic].positionX1 * screenWidth - 25
            }
            y={
              activeTactic &&
              tactics[activeTactic].positionY1 * screenHeight - 15
            }
            disabled={true}
            isCircle={true}
            renderSize={13}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial1}
              </Text>
            </View>
          </Draggable>

          <Draggable
            x={
              activeTactic &&
              tactics[activeTactic].positionX2 * screenWidth - 25
            }
            y={
              activeTactic &&
              tactics[activeTactic].positionY2 * screenHeight - 15
            }
            disabled={true}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial2}
              </Text>
            </View>
          </Draggable>

          <Draggable
            x={
              activeTactic &&
              tactics[activeTactic].positionX3 * screenWidth - 25
            }
            y={
              activeTactic &&
              tactics[activeTactic].positionY3 * screenHeight - 15
            }
            disabled={true}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial3}
              </Text>
            </View>
          </Draggable>

          <Draggable
            x={
              activeTactic &&
              tactics[activeTactic].positionX4 * screenWidth - 25
            }
            y={
              activeTactic &&
              tactics[activeTactic].positionY4 * screenHeight - 15
            }
            disabled={true}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial4}
              </Text>
            </View>
          </Draggable>

          <Draggable
            x={
              activeTactic &&
              tactics[activeTactic].positionX5 * screenWidth - 25
            }
            y={
              activeTactic &&
              tactics[activeTactic].positionY5 * screenHeight - 15
            }
            disabled={true}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial5}
              </Text>
            </View>
          </Draggable>

          <Draggable
            x={
              activeTactic &&
              tactics[activeTactic].positionX6 * screenWidth - 25
            }
            y={
              activeTactic &&
              tactics[activeTactic].positionY6 * screenHeight - 15
            }
            disabled={true}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial6}
              </Text>
            </View>
          </Draggable>

          <Draggable
            x={
              (activeTactic && tactics[activeTactic].positionX7) * screenWidth -
              25
            }
            y={
              (activeTactic && tactics[activeTactic].positionY7) *
              screenHeight -
              15
            }
            disabled={true}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial7}
              </Text>
            </View>
          </Draggable>

          <Draggable
            x={
              activeTactic &&
              tactics[activeTactic].positionX8 * screenWidth - 25
            }
            y={
              activeTactic &&
              tactics[activeTactic].positionY8 * screenHeight - 15
            }
            disabled={true}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial8}
              </Text>
            </View>
          </Draggable>

          <Draggable
            x={
              activeTactic &&
              tactics[activeTactic].positionX9 * screenWidth - 25
            }
            y={
              activeTactic &&
              tactics[activeTactic].positionY9 * screenHeight - 15
            }
            disabled={true}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial9}
              </Text>
            </View>
          </Draggable>

          <Draggable
            x={
              activeTactic &&
              tactics[activeTactic].positionX10 * screenWidth - 25
            }
            y={
              activeTactic &&
              tactics[activeTactic].positionY10 * screenHeight - 15
            }
            disabled={true}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial10}
              </Text>
            </View>
          </Draggable>

          <Draggable
            x={
              activeTactic &&
              tactics[activeTactic].positionX11 * screenWidth - 25
            }
            y={
              activeTactic &&
              tactics[activeTactic].positionY11 * screenHeight - 15
            }
            disabled={true}
          >
            <View style={styles.players}>
              <Text style={styles.initialText}>
                {activeTactic && tactics[activeTactic].initial11}
              </Text>
            </View>
          </Draggable>
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
                        ) : (null)}
                     
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
  },

  chooseTacticText: {
    fontSize: 14,
    color: "#A247D4",
    textAlign: "center",
    marginLeft: "3%"
  },

/*   tacticTitle: {
    height: screenHeight * 0.035,
  }, */

  tacticTitleText: {
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingLeft: "15%"
  },



  theField: {
    height: screenHeight * 0.71,
    width: "100%",
    justifyContent: "center",
  },

  players: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 15,
  },


  initialText: {
    fontSize: 12,
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
    flexDirection: "row" 

  },

  trashIcon: {
    justifyContent: "flex-end"
  },

  bottomMenu: {
    height: screenHeight * 0.05
  }
});
