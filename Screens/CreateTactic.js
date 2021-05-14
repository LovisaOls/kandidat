import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import Draggable from "react-native-draggable"; // first, run "npm run source" to get Draggable.js
import TopMenu from "../Screens/TopMenu";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

import { Actions } from "react-native-router-flux";

export default function CreateTactic() {
  const { activeTeam } = useSelector(state => state.currentTeams);
  const [title, setTitle] = useState("");


  const [initial1, setPlayer1] = useState("");
  const [positionX1, setPositionX1] = useState("");
  const [positionY1, setPositionY1] = useState("");

  const [initial2, setPlayer2] = useState("");
  const [positionX2, setPositionX2] = useState("");
  const [positionY2, setPositionY2] = useState("");

  const [initial3, setPlayer3] = useState("");
  const [positionX3, setPositionX3] = useState("");
  const [positionY3, setPositionY3] = useState("");

  const [initial4, setPlayer4] = useState("");
  const [positionX4, setPositionX4] = useState("");
  const [positionY4, setPositionY4] = useState("");

  const [initial5, setPlayer5] = useState("");
  const [positionX5, setPositionX5] = useState("");
  const [positionY5, setPositionY5] = useState("");

  const [initial6, setPlayer6] = useState("");
  const [positionX6, setPositionX6] = useState("");
  const [positionY6, setPositionY6] = useState("");

  const [initial7, setPlayer7] = useState("");
  const [positionX7, setPositionX7] = useState("");
  const [positionY7, setPositionY7] = useState("");

  const [initial8, setPlayer8] = useState("");
  const [positionX8, setPositionX8] = useState("");
  const [positionY8, setPositionY8] = useState("");

  const [initial9, setPlayer9] = useState("");
  const [positionX9, setPositionX9] = useState("");
  const [positionY9, setPositionY9] = useState("");

  const [initial10, setPlayer10] = useState("");
  const [positionX10, setPositionX10] = useState("");
  const [positionY10, setPositionY10] = useState("");

  const [initial11, setPlayer11] = useState("");
  const [positionX11, setPositionX11] = useState("");
  const [positionY11, setPositionY11] = useState("");

  const setPositions1 = (xPos, yPos) => {
    setPositionX1(xPos);
    setPositionY1(yPos);
  };
  const setPositions2 = (xPos, yPos) => {
    setPositionX2(xPos);
    setPositionY2(yPos);
  };
  const setPositions3 = (xPos, yPos) => {
    setPositionX3(xPos);
    setPositionY3(yPos);
  };
  const setPositions4 = (xPos, yPos) => {
    setPositionX4(xPos);
    setPositionY4(yPos);
  };
  const setPositions5 = (xPos, yPos) => {
    setPositionX5(xPos);
    setPositionY5(yPos);
  };
  const setPositions6 = (xPos, yPos) => {
    setPositionX6(xPos);
    setPositionY6(yPos);
  };
  const setPositions7 = (xPos, yPos) => {
    setPositionX7(xPos);
    setPositionY7(yPos);
  };
  const setPositions8 = (xPos, yPos) => {
    setPositionX8(xPos);
    setPositionY8(yPos);
  };
  const setPositions9 = (xPos, yPos) => {
    setPositionX9(xPos);
    setPositionY9(yPos);
  };
  const setPositions10 = (xPos, yPos) => {
    setPositionX10(xPos);
    setPositionY10(yPos);
  };
  const setPositions11 = (xPos, yPos) => {
    setPositionX11(xPos);
    setPositionY11(yPos);
  };

  const onCreateLineUp = () => {
    const tacticRef = firebase.database().ref("/tactics/").push();
    const tacticKey = tacticRef.key;

    tacticRef
      .set({
        teamId: activeTeam.teamId,
        tacticId: tacticKey,
        title: title,

        initial1: initial1,
        positionX1: positionX1,
        positionY1: positionY1,
        
        initial2: initial2,
        positionX2: positionX2,
        positionY2: positionY2,

        initial3: initial3,
        positionX3: positionX3,
        positionY3: positionY3,

        initial4: initial4,
        positionX4: positionX4,
        positionY4: positionY4,

        initial5: initial5,
        positionX5: positionX5,
        positionY5: positionY5,

        initial6: initial6,
        positionX6: positionX6,
        positionY6: positionY6,

        initial7: initial7,
        positionX7: positionX7,
        positionY7: positionY7,

        initial8: initial8,
        positionX8: positionX8,
        positionY8: positionY8,

        initial9: initial9,
        positionX9: positionX9,
        positionY9: positionY9,

        initial10: initial10,
        positionX10: positionX10,
        positionY10: positionY10,

        initial11: initial11,
        positionX11: positionX11,
        positionY11: positionY11,
      })
      .then(() => {
        Actions.TacticsCoach();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu />
      <TouchableOpacity style={styles.button} onPress={() => onCreateLineUp()}>
        <Text style={styles.buttonTitle}> Save Team </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Actions.TacticsCoach()}>
        <Text style={styles.cancelText}> Cancel </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />

      <ImageBackground
        source={require("../assets/footballfield.png")}
        style={{
          flex: 1,
        }}
      ></ImageBackground>

      <Draggable
        x={195}
        y={350}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions1(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer1(text)}
            value={initial1}
          ></TextInput>
        </View>
      </Draggable>

      <Draggable
        x={30}
        y={450}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions2(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer2(text)}
            value={initial2}
          ></TextInput>
        </View>
      </Draggable>

      <Draggable
        x={195}
        y={450}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions3(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer3(text)}
            value={initial3}
          ></TextInput>
        </View>
      </Draggable>

      <Draggable
        x={350}
        y={450}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions4(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer4(text)}
            value={initial4}
          ></TextInput>
        </View>
      </Draggable>

      <Draggable
        x={110}
        y={600}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions5(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer5(text)}
            value={initial5}
          ></TextInput>
        </View>
      </Draggable>

      <Draggable
        x={280}
        y={600}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions6(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer6(text)}
            value={initial6}
          ></TextInput>
        </View>
      </Draggable>

      <Draggable
        x={25}
        y={680}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions7(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer7(text)}
            value={initial7}
          ></TextInput>
        </View>
      </Draggable>

      <Draggable
        x={100}
        y={740}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions8(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer8(text)}
            value={initial8}
          ></TextInput>
        </View>
      </Draggable>

      <Draggable
        x={290}
        y={740}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions9(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer9(text)}
            value={initial9}
          ></TextInput>
        </View>
      </Draggable>

      <Draggable
        x={370}
        y={680}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions10(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer10(text)}
            value={initial10}
          ></TextInput>
        </View>
      </Draggable>

      <Draggable
        x={195}
        y={800}
        minX={10}
        maxX={420}
        maxY={840}
        minY={210}
        onDragRelease={(e) =>
          setPositions11(e.nativeEvent.pageX, e.nativeEvent.pageY)
        }
      >
        <View style={styles.players}>
          <TextInput
            placeholder={"...."}
            onChangeText={(text) => setPlayer11(text)}
            value={initial11}
          ></TextInput>
        </View>
      </Draggable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
  },

  players: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 15,
  },

  button: {
    backgroundColor: "red",
    marginBottom: 5,
    height: 30,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontSize: 16,
    color: "blue",
    margin: 5,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    fontSize: 16,
    height: 30,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderWidth: 0.25,
  },
});
