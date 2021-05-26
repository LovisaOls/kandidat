import "firebase/database";
require("firebase/auth");
import * as firebase from "firebase";
import { Actions } from "react-native-router-flux";

export const createTactic = (
  activeTeam,
  initial1,
  positionX1,
  positionY1,
  initial2,
  positionX2,
  positionY2,
  initial3,
  positionX3,
  positionY3,
  initial4,
  positionX4,
  positionY4,
  initial5,
  positionX5,
  positionY5,
  initial6,
  positionX6,
  positionY6,
  initial7,
  positionX7,
  positionY7,
  initial8,
  positionX8,
  positionY8,
  initial9,
  positionX9,
  positionY9,
  initial10,
  positionX10,
  positionY10,
  initial11,
  positionX11,
  positionY11,
  title
) => {
  return () => {
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
};

export const fetchTactics = (teamId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/tactics/")
      .orderByChild("teamId")
      .equalTo(teamId)
      .on("value", (snapshot) => {
        dispatch({ type: "FETCH_TACTICS", lineUpTactics: snapshot.val() });
      });
  };
};

export const removeTactic = (tacticId) => {
  return () => {
    firebase.database().ref(`/tactics/${tacticId}`).remove();
  };
};
