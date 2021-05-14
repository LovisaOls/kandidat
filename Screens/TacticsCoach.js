
import React, { useRef, useEffect, useState } from "react";
import { View, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, Text, Modal, Dimensions, } from 'react-native';
import Draggable from 'react-native-draggable'; // first, run "npm run source" to get Draggable.js
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import { useDispatch, useSelector } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { fetchTactics } from "../actions/index";
import { Modalize } from "react-native-modalize";
import TopMenu from "./TopMenu";
import Icon from "react-native-vector-icons/Ionicons";
import { removeTactic } from "../actions/index";



export default function TacticsCoach() {

  const screenHeight = Dimensions.get("window").height;
  const { activeTeam } = useSelector((state) => state.currentTeams);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTactics(activeTeam.teamId));
  }, [dispatch]);

  const tactics = useSelector((state) => state.lineUpTactics);
  const [activeTactic, setActiveTactic] = useState("")
  const modalRef = useRef(null);
  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  const onTacticPressed = (tactic) => {
    setActiveTactic(tactic.tacticId);
  }

  const deleteTactic = (tactic) => {
      dispatch(removeTactic(tactic.tacticId));
  }


  return (

    <SafeAreaView style={styles.container}>

      <TopMenu />
      <TouchableOpacity
        style={styles.button}
        onPress={() => Actions.CreateTactic()}>
        <Text style={styles.buttonTitle}> Create LineUp </Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity
          onPress={() => onOpen()}

        >
          <View style={styles.tacticTitle}>
            <Text style={styles.tacticTitleText}> CHOOSE TACTIC </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.tacticTitle}>
        <Text style={styles.tacticTitleText}> {activeTactic && tactics[activeTactic].title} </Text>
      </View>

      <ImageBackground
        source={require('../assets/footballfield.png')}
        style={{
          flex: 1,
        }}>
      </ImageBackground>
      
        

      {activeTactic && tactics ? (
      <>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX1}
        y={activeTactic && tactics[activeTactic].positionY1}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial1}</Text>
        </View>
      </Draggable>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX2}
        y={activeTactic && tactics[activeTactic].positionY2}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial2}</Text>
        </View>
      </Draggable>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX3}
        y={activeTactic && tactics[activeTactic].positionY3}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial3}</Text>
        </View>
      </Draggable>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX4}
        y={activeTactic && tactics[activeTactic].positionY4}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial4}</Text>
        </View>
      </Draggable>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX5}
        y={activeTactic && tactics[activeTactic].positionY5}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial5}</Text>
        </View>
      </Draggable>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX6}
        y={activeTactic && tactics[activeTactic].positionY6}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial6}</Text>
        </View>
      </Draggable>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX7}
        y={activeTactic && tactics[activeTactic].positionY7}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial7}</Text>
        </View>
      </Draggable>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX8}
        y={activeTactic && tactics[activeTactic].positionY8}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial8}</Text>
        </View>
      </Draggable>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX9}
        y={activeTactic && tactics[activeTactic].positionY9}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial9}</Text>
        </View>
      </Draggable>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX10}
        y={activeTactic && tactics[activeTactic].positionY10}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial10}</Text>
        </View>
      </Draggable>

      <Draggable
        x={activeTactic && tactics[activeTactic].positionX11}
        y={activeTactic && tactics[activeTactic].positionY11}
        disabled={true}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{activeTactic && tactics[activeTactic].initial11}</Text>
        </View>
      </Draggable>
      </>):(null)
            }     



{tactics ? (
  <>
      <Modalize
        ref={modalRef}
        snapPoint={500}
        modalHeight={screenHeight * 0.85}
      >
        <View style={styles.modal}>
          <Text style={styles.title}> PICK A TACTIC </Text>
          {
            Object.keys(tactics).map((i) => {
              return (
                <TouchableOpacity
                  onPress={() => onTacticPressed(tactics[i])}
                >
                  <View key={i} style={styles.viewMembers}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>

                      <View>
                        <Text style={styles.nameTeamMember}>
                          {tactics[i].title}
                        </Text>
                      </View>

                      <View>
                      <TouchableOpacity>
                      <Icon
                        onPress = { () => deleteTactic(tactics[i])} 
                        name="ios-trash-outline"
                        size={20}
                                               
                      ></Icon>
                    </TouchableOpacity>
                      </View>


                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
        </View>
      </Modalize>
      </>):(null)
            }    


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  players: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 15,
  },
  button: {
    backgroundColor: 'red',
    marginBottom: 5,
    height: 30,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },

  initialText: {
    fontSize: 12,
  },

  cancelText: {
    fontSize: 16,
    color: 'blue',
    margin: 5,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  tacticTitle: {
    marginTop: 5,
    marginBottom: 5,
  },


  tacticTitleText: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    height: 30,
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    fontWeight: "bold",
    margin: 10,
  },

  modal: {
    padding: 20,
  },

  viewMembers: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    margin: 1,
    padding: 15,
  },

})
