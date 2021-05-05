
import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, Text, TextInput } from 'react-native';
import Draggable from 'react-native-draggable'; // first, run "npm run source" to get Draggable.js
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import { useDispatch, useSelector } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { fetchTactics } from "../actions";
import TopMenu from "./TopMenu";



export default function TacticsCoach() {

  const { activeTeam } = useSelector((state) => state.currentTeams);

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchTactics(activeTeam.teamId));
  }, [dispatch]);

  const tactics  = useSelector((state) => state.lineUpTactics);
  
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
    
   {Object.keys(tactics).map((tacticId) => {
          firstPlayer = (tactics[tacticId].player1)
          secondPlayer = (tactics[tacticId].player2)
          thirdPlayer = (tactics[tacticId].player3)
          fourthPlayer = (tactics[tacticId].player4)
          fifthPlayer = (tactics[tacticId].player5)
          sixthPlayer = (tactics[tacticId].player6)
          seventhPlayer = (tactics[tacticId].player7)
          eighthPlayer = (tactics[tacticId].player8)
          ninthPlayer = (tactics[tacticId].player9)
          tenthPlayer = (tactics[tacticId].player10)
          eleventhPlayer = (tactics[tacticId].player11)
       }  ,   
       console.log(tactics)
   )}
   
  
  }

 hejhej(); 


  return (

    <SafeAreaView style={styles.container}>
 
      <TopMenu />
      <TouchableOpacity
        style={styles.button}
        onPress={() => Actions.CreateTactic()}>
        <Text style={styles.buttonTitle}> Create LineUp </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Actions.TacticsCoach()}>
        <Text style={styles.cancelText}> Cancel </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder='Title'
        placeholderTextColor="#aaaaaa"

      />
      


      <ImageBackground
        source={require('../assets/footballfield.png')}
        style={{
          flex: 1,
        }}>
      </ImageBackground>


      <Draggable
        x={firstPlayer.positionX1} y={firstPlayer.positionY1}
        minX={0}
        maxX={"100%"}
         >
        <View style={styles.players}>
          <Text style={styles.initialText}>{firstPlayer.initial}</Text>
          
        </View>
          
      </Draggable>


      <Draggable 
      x={secondPlayer.positionX2} y={secondPlayer.positionY2}
      >
        <View style={styles.players}>
        <Text style={styles.initialText}>{secondPlayer.initial}</Text>
        </View>
      </Draggable>

      <Draggable 
      x={thirdPlayer.positionX3} y={thirdPlayer.positionY3}>
        <View style={styles.players}>
        <Text style={styles.initialText}>{thirdPlayer.initial}</Text>
        </View>
      </Draggable>

      <Draggable 
      x={fourthPlayer.positionX4} y={fourthPlayer.positionY4}>
        <View style={styles.players}>
        <Text style={styles.initialText}>{fourthPlayer.initial}</Text>
        </View>
      </Draggable>

      <Draggable 
      x={fifthPlayer.positionX5} y={fifthPlayer.positionY5}>
        <View style={styles.players}>
        <Text style={styles.initialText}>{fifthPlayer.initial}</Text>
        </View>
      </Draggable>

      <Draggable 
      x={sixthPlayer.positionX6} y={sixthPlayer.positionY6}>
        <View style={styles.players}>
        <Text style={styles.initialText}>{sixthPlayer.initial}</Text>
        </View>
      </Draggable>

      <Draggable x={seventhPlayer.positionX7} y={seventhPlayer.positionY7}>
        <View style={styles.players}>
        <Text style={styles.initialText}>{seventhPlayer.initial}</Text>
        </View>
      </Draggable>

      <Draggable x={eighthPlayer.positionX8} y={eighthPlayer.positionY8}>
        <View style={styles.players}>
        <Text style={styles.initialText}>{eighthPlayer.initial}</Text>
        </View>
      </Draggable>

      <Draggable x={ninthPlayer.positionX9} y={ninthPlayer.positionY9}>
        <View style={styles.players}>
        <Text style={styles.initialText}>{ninthPlayer.initial}</Text>
        </View>
      </Draggable>

      <Draggable x={tenthPlayer.positionX10} y={tenthPlayer.positionY10}>
        <View style={styles.players}>
        <Text style={styles.initialText}>{tenthPlayer.initial}</Text>
        </View>
      </Draggable>

      <Draggable x={eleventhPlayer.positionX11} y={eleventhPlayer.positionY11}>
        <View style={styles.players}>
        <Text style={styles.initialText}>{eleventhPlayer.initial}</Text>
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
  input: {
    fontSize: 16,
    height: 30,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderWidth: 0.25
},

})
