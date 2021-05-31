import "firebase/database";
require("firebase/auth");
import * as firebase from "firebase";
import { Actions } from "react-native-router-flux";

export const createTactic = (activeTeam, title, allPlayerInfo) => {
  return () => {
    const tacticRef = firebase.database().ref("/tactics/").push();
    const tacticKey = tacticRef.key;

    tacticRef
      .set({
        teamId: activeTeam.teamId,
        tacticId: tacticKey,
        title: title,
        players: [],
      })
      .then(() => {
        console.log("info", allPlayerInfo);
        Object.keys(allPlayerInfo).map((player) => {
          {
            tacticRef.child("players/" + allPlayerInfo[player].playerId).set({
              xPosition: allPlayerInfo[player].xPos,
              yPosition: allPlayerInfo[player].yPos,
            });
          }
        });
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
