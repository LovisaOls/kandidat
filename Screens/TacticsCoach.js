
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { View, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, Text, TextInput } from 'react-native';
import Draggable from 'react-native-draggable'; // first, run "npm run source" to get Draggable.js


import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

import { Actions } from 'react-native-router-flux';



export default function TacticsCoach() {



  return (


    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Actions.CreateTactic()}>
        <Text style={styles.buttonTitle}> Create LineUp </Text>
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
        onDragRelease={(e) => setPosXPlayer1(e.nativeEvent.pageX,e.nativeEvent.pageY)}
        value={posxplayer1}
      

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


      <Draggable x={20} y={250}>
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

        </View>
      </Draggable>

      <Draggable x={370} y={480}>
        <View style={styles.players}>

        </View>
      </Draggable>

      <Draggable x={195} y={630}>
        <View style={styles.players}>

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
