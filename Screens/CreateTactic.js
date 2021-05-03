
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { View, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, Text, TextInput } from 'react-native';
import Draggable from 'react-native-draggable'; // first, run "npm run source" to get Draggable.js


import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

import { Actions } from 'react-native-router-flux';



export default function CreateTactic() {
  const { activeTeam } = useSelector(state => state.currentTeams);
  
  
  const [player1, setPlayer1] = useState("");
  const [positionX1, setPositionX1] = useState("");
  const [positionY1, setPositionY1] = useState("");

  const [player2, setPlayer2] = useState("");
  const [positionX2, setPositionX2] = useState("");
  const [positionY2, setPositionY2] = useState("");

  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");
  const [player5, setPlayer5] = useState("");
  const [player6, setPlayer6] = useState("");
  const [player7, setPlayer7] = useState("");
  const [player8, setPlayer8] = useState("");
  const [player9, setPlayer9] = useState("");
  const [player10, setPlayer10] = useState("");
  const [player11, setPlayer11] = useState("");


  const setPositions1 = (xPos, yPos) =>{
    setPositionX1(xPos)
    setPositionY1(yPos)
  }
  const setPositions2 = (xPos, yPos) =>{
    setPositionX2(xPos)
    setPositionY2(yPos)
  }



  const onCreatePres = () => {


    firebase.database().ref('/tactics/').push()
      .set({
        teamId: activeTeam.teamId,
        player1: {initial:player1,
        positionX1,
        positionY1},
        
        player2: {initial:player2,
          positionX2,
          positionY2},

        player3: player3,
        player4: player4,
        player5: player5,
        player6: player6,
        player7: player7,
        player8: player8,
        player9: player9,
        player10: player10,
        player11: player11,

        /* posX: posX,
        posY: posY, */

      })
      .then(() => {
        Actions.CoachHome()
      })
      .catch((error) => {
        alert(error)
      });


  }


  /* const saveCords = () => {
    console.log("x");
   
  }; */


  return (


    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onCreatePres()}>
        <Text style={styles.buttonTitle}> Save Team </Text>
      </TouchableOpacity>

      <ImageBackground
        source={require('../assets/footballfield.png')}
        style={{
          width: null,
          height: null,
          flex: 1,
        }}>
      </ImageBackground>



      <Draggable
        x={195} y={150}
        minX={0}
        maxX={"100%"}
        onDragRelease={(e) => setPositions1(e.nativeEvent.pageX, e.nativeEvent.pageY)}
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer1(text)}
            value={player1}
          >
          </TextInput>
        </View>
      </Draggable>


      <Draggable 
      x={20} y={250}
      onDragRelease={(e) => setPositions2(e.nativeEvent.pageX, e.nativeEvent.pageY)}
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer2(text)}
            value={player2}
          >
          </TextInput>
        </View>
      </Draggable>

      <Draggable x={195} y={250}>
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer3(text)}
            value={player3}
          >
          </TextInput>
        </View>
      </Draggable>

      <Draggable x={350} y={250}>
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer4(text)}
            value={player4}
          >
          </TextInput>
        </View>
      </Draggable>

      <Draggable x={110} y={400}>
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer5(text)}
            value={player5}
          >
          </TextInput>
        </View>
      </Draggable>

      <Draggable x={280} y={400}>
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer6(text)}
            value={player6}
          >
          </TextInput>
        </View>
      </Draggable>

      <Draggable x={10} y={480}>
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer7(text)}
            value={player7}
          >
          </TextInput>
        </View>
      </Draggable>

      <Draggable x={100} y={540}>
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer8(text)}
            value={player8}
          >
          </TextInput>
        </View>
      </Draggable>

      <Draggable x={290} y={540}>
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer9(text)}
            value={player9}
          >
          </TextInput>
        </View>
      </Draggable>

      <Draggable x={370} y={480}>
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer10(text)}
            value={player10}
          >
          </TextInput>
        </View>
      </Draggable>

      <Draggable x={195} y={630}>
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer11(text)}
            value={player11}
          >
          </TextInput>
        </View>
      </Draggable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
  },


  players: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 15,

  },
})
