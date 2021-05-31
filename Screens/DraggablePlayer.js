import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, Alert } from "react-native";
import Draggable from "react-native-draggable"; // first, run "npm run source" to get Draggable.js
import { useSelector } from "react-redux";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const DraggablePlayer = ({ setPlayerInfo, player }) => {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const { teamMembers } = useSelector((state) => state.currentTeams);

  useEffect(() => {
    console.log(player, xPosition, yPosition);
    setPlayerInfo(player, xPosition, yPosition);
  }, [player, xPosition, yPosition]);

  const onPlayerPressed = () => {
    Alert.alert(
      teamMembers[player].firstName + " " + teamMembers[player].lastName
    );
  };
  return (
    <Draggable
      x={screenWidth * 0.05}
      y={screenHeight * 0.05}
      minX={0}
      minY={0}
      onDragRelease={(e) => {
        setXPosition(e.nativeEvent.pageX / screenWidth);
        setYPosition(e.nativeEvent.pageY / screenHeight);
      }}
      onShortPressRelease={() => onPlayerPressed()}
    >
      <View style={styles.players}>
        <Text style={styles.playerText}>
          {player != null && teamMembers[player].firstName[0]}
          {player != null && teamMembers[player].lastName[0]}
        </Text>
      </View>
    </Draggable>
  );
};

const styles = StyleSheet.create({
  playerText: {
    color: "white",
    fontWeight: "bold",
  },
  players: {
    height: screenWidth * 0.08,
    width: screenWidth * 0.08,
    borderRadius: (screenWidth * 0.08) / 2,
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DraggablePlayer;
