import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, Text, Modal } from 'react-native';
import Draggable from 'react-native-draggable'; // first, run "npm run source" to get Draggable.js
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import { useDispatch, useSelector } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { fetchTactics } from "../actions/index";
import TopMenu from "./TopMenu";




export default function TacticsCoach() {
  

  const { activeTeam } = useSelector((state) => state.currentTeams);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTactics(activeTeam.teamId));
  }, [dispatch]);

  const tactics = useSelector((state) => state.lineUpTactics);
  /* const [chooseTactic, setChooseTactic] = useState("Select tactic") */

  console.log(tactics)

  let titles;
  let firstPlayer;
  let secondPlayer;
  let thirdPlayer;
  let fourthPlayer;
  let fifthPlayer;
  let sixthPlayer;
  let seventhPlayer;
  let eighthPlayer;
  let ninthPlayer;
  let tenthPlayer;
  let eleventhPlayer;

  function hejhej() {
    console.log("2")
    
    {
      Object.keys(tactics).map((i) => {
        titles = (tactics[i].title)
        firstPlayer = (tactics[i].player1)
        secondPlayer = (tactics[i].player2)
        thirdPlayer = (tactics[i].player3)
        fourthPlayer = (tactics[i].player4)
        fifthPlayer = (tactics[i].player5)
        sixthPlayer = (tactics[i].player6)
        seventhPlayer = (tactics[i].player7)
        eighthPlayer = (tactics[i].player8)
        ninthPlayer = (tactics[i].player9)
        tenthPlayer = (tactics[i].player10)
        eleventhPlayer = (tactics[i].player11)
        
      }  ,
      
      )
      console.log(tactics)
    
  }
    /*     {
          Object.keys(tactics).map((i) => {
    console.log(tactics[i].title)
          })
      } */
  }



  hejhej();


  return (
    console.log(tactics),
    <SafeAreaView style={styles.container}>

      <TopMenu />
      <TouchableOpacity
        style={styles.button}
        onPress={() => Actions.CreateTactic()}>
        <Text style={styles.buttonTitle}> Create LineUp </Text>
      </TouchableOpacity>



      <View style={styles.tacticTitle}>
        <Text style={styles.tacticTitleText}> {titles} </Text>
      </View>


      <ImageBackground
        source={require('../assets/footballfield.png')}
        style={{
          flex: 1,
        }}>
      </ImageBackground>

      
      <Draggable
        x={200} y={200}
        minX={0}
        maxX={"100%"}
        
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>

        </View>

      </Draggable>


      <Draggable
        x={200} y={200}
      >
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>
        </View>
      </Draggable>

      <Draggable
        x={200} y={200}>
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>
        </View>
      </Draggable>

      <Draggable
        x={200} y={200}>
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>
        </View>
      </Draggable>

      <Draggable
        x={200} y={200}>
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>
        </View>
      </Draggable>

      <Draggable
        x={200} y={200}>
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>
        </View>
      </Draggable>

      <Draggable x={200} y={200}>
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>
        </View>
      </Draggable>

      <Draggable x={200} y={200}>
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>
        </View>
      </Draggable>

      <Draggable x={200} y={200}>
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>
        </View>
      </Draggable>

      <Draggable x={200} y={200}>
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>
        </View>
      </Draggable>

      <Draggable x={200} y={200}>
        <View style={styles.players}>
          <Text style={styles.initialText}>{200}</Text>
        </View>
      </Draggable>

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

})
