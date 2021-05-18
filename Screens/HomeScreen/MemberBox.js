import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import "firebase/database";
require("firebase/auth");
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/Ionicons";

const MemberBox = ({ user }) => {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const { teamMembers } = useSelector((state) => state.currentTeams);
  const currentUser = useSelector((state) => state.currentUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [sureRemoveVisible, setSureRemoveVisible] = useState(false);
  const [sureAssignVisible, setSureAssignVisible] = useState(false);

  const onDeletePressed = () => {
    if (sureRemoveVisible) {
      firebase
        .database()
        .ref(`/users/${teamMembers[user].id}/teams/${activeTeam.teamId}`)
        .remove()
        .then(
          firebase
            .database()
            .ref(`/teams/${activeTeam.teamId}/members/${teamMembers[user].id}`)
            .remove()
        )
        .then(setModalVisible(!modalVisible));
    } else {
      setSureRemoveVisible(true);
    }
  };

  const onAssignPressed = () => {
    if (sureAssignVisible) {
      firebase
        .database()
        .ref(`/users/${teamMembers[user].id}/teams/${activeTeam.teamId}`)
        .set("coach")
        .then(
          firebase
            .database()
            .ref(`/teams/${activeTeam.teamId}/members/${teamMembers[user].id}`)
            .set("coach")
        )
        .then(setModalVisible(!modalVisible));
    } else {
      setSureAssignVisible(true);
    }
  };
  const onEditPressed = () => {
    setModalVisible(true);
  };

  const onCancel = () => {
    setSureAssignVisible(false);
    setSureRemoveVisible(false);
    setModalVisible(false);
  };

  return (
    <View style={styles.viewMembers}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {teamMembers[user].profilePicture ? (
            <Image
              source={{ uri: teamMembers[user].profilePicture }}
              style={styles.image}
            />
          ) : (
            <View style={styles.initialCircle}>
              <Text style={styles.initialText}>
                {teamMembers[user].firstName[0]}
                {teamMembers[user].lastName[0]}
              </Text>
            </View>
          )}

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.nameTeamMember}>
                {teamMembers[user].firstName} {teamMembers[user].lastName}
              </Text>
              {activeTeam.members[teamMembers[user].id] == "coach" ? (
                <Icon name="shield-checkmark" size={16} color="#A247D4"></Icon>
              ) : null}
            </View>
            <Text>{teamMembers[user].email}</Text>
          </View>
        </View>

        {activeTeam.members[currentUser.id] == "coach" &&
        currentUser.id != teamMembers[user].id ? (
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => onEditPressed()}
          >
            <Icon name="pencil" size={20} color="#A247D4"></Icon>
          </TouchableOpacity>
        ) : null}
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => onCancel()}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Team Member</Text>
            <Text style={styles.modalText}>
              Member: {teamMembers[user].firstName} {teamMembers[user].lastName}
            </Text>
            {sureRemoveVisible || sureAssignVisible ? (
              <Text style={styles.modalText}>Are you sure?</Text>
            ) : null}
            <View style={styles.buttonView}>
              {!sureAssignVisible ? (
                <TouchableOpacity
                  style={styles.buttonRemove}
                  onPress={() => onDeletePressed()}
                >
                  <Text style={styles.textStyle}>
                    {sureRemoveVisible ? "Yes, Remove" : "Remove from team"}
                  </Text>
                </TouchableOpacity>
              ) : null}
              {!sureRemoveVisible ? (
                <TouchableOpacity
                  style={styles.buttonAssign}
                  onPress={() => onAssignPressed()}
                >
                  <Text style={styles.textStyle}>
                    {sureAssignVisible ? "Yes, Assign" : "Assign as Coach"}
                  </Text>
                </TouchableOpacity>
              ) : null}

              {sureRemoveVisible ? (
                <TouchableOpacity
                  style={styles.buttonSkip}
                  onPress={() => setSureRemoveVisible(false)}
                >
                  <Text style={styles.textStyleSkip}>No</Text>
                </TouchableOpacity>
              ) : null}
              {sureAssignVisible ? (
                <TouchableOpacity
                  style={styles.buttonSkip}
                  onPress={() => setSureAssignVisible(false)}
                >
                  <Text style={styles.textStyleSkip}>No</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  memberBox: {
    margin: 20,
    alignItems: "center",
  },
  viewMembers: {
    width: "100%",
    borderRadius: 10,
    margin: 1,
    padding: 5,
  },
  nameTeamMember: {
    fontWeight: "bold",
    fontSize: 14,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  initialCircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: screenWidth * 0.9,
    height: screenWidth * 0.6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonAssign: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#007E34",
    margin: 10,
    width: "50%",
    justifyContent: "center",
  },
  buttonRemove: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#FF6347",
    margin: 10,
    width: "50%",
    justifyContent: "center",
  },
  buttonSkip: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#DDDDDD",
    margin: 10,
    width: "50%",
    justifyContent: "center",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  textStyleSkip: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default MemberBox;
