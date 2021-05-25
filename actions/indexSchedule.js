import "firebase/database";
require("firebase/auth");
import * as firebase from "firebase";
import { Actions } from "react-native-router-flux";

export const createEvent = (
  teamId,
  date,
  title,
  type,
  place,
  description,
  members
) => {
  return () => {
    const eventRef = firebase.database().ref("/events/").push();
    const eventKey = eventRef.key;
    const monthFormatted = ("0" + (date.getMonth() + 1)).slice(-2);
    const dateFormatted = ("0" + date.getDate()).slice(-2);
    const hoursFormatted = ("0" + date.getHours()).slice(-2);
    const minutesFormatted = ("0" + date.getMinutes()).slice(-2);
    eventRef
      .set({
        teamId: teamId,
      })
      .then(
        firebase
          .database()
          .ref(`/events/${eventKey}/eventDetails/`)
          .child(`${date.getFullYear()}-${monthFormatted}-${dateFormatted}`)
          .set({
            title: title,
            type: type,
            time: `${hoursFormatted}:${minutesFormatted}`,
            place: place,
            description: description,
            date: `${date.getFullYear()}-${monthFormatted}-${dateFormatted}`,
            eventId: eventKey,
          })
      )
      .then(() => {
        Actions.pop();
      })
      .catch((error) => {
        alert(error);
      });
  };
};

export const fetchEvents = (teamId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/events/")
      .orderByChild("teamId")
      .equalTo(teamId)
      .on("value", (snapshot) => {
        dispatch({ type: "FETCH_EVENTS", scheduleEvents: snapshot.val() });
      });
  };
};

export const removeEvent = (eventId) => {
  return () => {
    firebase.database().ref(`/events/${eventId}`).remove();
  };
};

export const updateEvent = (
  eventId,
  title,
  type,
  place,
  description,
  date,
  time
) => {
  return () => {
    firebase
      .database()
      .ref("/events/" + eventId + "/eventDetails/")
      .child(date)
      .set({
        title: title,
        type: type,
        place: place,
        description: description,
        time: time,
        date: date,
        eventId: eventId,
      })
      .catch((error) => {
        alert(error);
      });
  };
};

export const sendInvitations = (invitationList, eventId) => {
  return () => {
    for (let userId in invitationList) {
      firebase
        .database()
        .ref(`/events/${eventId}/participants/`)
        .child(invitationList[userId])
        .set("pending");
    }
  };
};

export const declineParticipation = (eventId, userId) => {
    return () => {
      firebase
        .database()
        .ref(`/events/${eventId}/participants/${userId}`)
        .set(false);
    };
  };
  
  export const acceptParticipation = (eventId, userId) => {
    return () => {
      firebase
        .database()
        .ref(`/events/${eventId}/participants/${userId}`)
        .set(true);
    };
  };
