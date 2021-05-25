import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import {
  removeEvent,
  sendInvitations,
  acceptParticipation,
  declineParticipation,
} from "../../actions/index";
import EditEvent from "./EditEvent";
import MemberInvitationBox from "./MemberInvitationBox";
import { ScrollView } from "react-native-gesture-handler";

const EventModule = ({ activeEvent, setActiveEvent, onClose }) => {
  const { activeTeam } = useSelector((state) => state.currentTeams);
  const events = useSelector((state) => state.scheduleEvents);
  const { teamMembers } = useSelector((state) => state.currentTeams);
  const currentUser = useSelector((state) => state.currentUser);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [sureRemoveVisible, setSureRemoveVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [invitationList, setInvitationList] = useState([]);
  const [allChosen, setAllChosen] = useState(false);
  const dispatch = useDispatch();
  const onChangePressed = () => {
    setEditModalVisible(true);
  };

  const onDeletePressed = () => {
    if (sureRemoveVisible) {
      dispatch(removeEvent(activeEvent.eventId));
      setEditModalVisible(false);
      setSureRemoveVisible(false);
      onClose();
      setActiveEvent(null);
    } else {
      setSureRemoveVisible(true);
    }
  };

  const onEditPressed = () => {
    setEditVisible(true);
  };

  const onInvitePressed = () => {
    setInviteModalVisible(true);
  };

  const onCancel = () => {
    if (editModalVisible) {
      setEditModalVisible(false);
      setEditVisible(false);
      setSureRemoveVisible(false);
      setAllChosen(false);
    } else if (inviteModalVisible) {
      setInviteModalVisible(false);
      setAllChosen(false);
    }
  };

  const addToInvitationList = (userId) => {
    invitationList.push(userId);
  };

  const removeFromInvitationList = (userId) => {
    const index = invitationList.indexOf(userId);
    if (index != -1) {
      invitationList.splice(index, 1);
    }
  };

  const onSendInvitations = () => {
    dispatch(sendInvitations(invitationList, activeEvent.eventId));
    setInviteModalVisible(false);
    setAllChosen(false);
  };

  const onAcceptPressed = () => {
    dispatch(acceptParticipation(activeEvent.eventId, currentUser.id));
  };

  const onDeclinePressed = () => {
    dispatch(declineParticipation(activeEvent.eventId, currentUser.id));
  };

  const allChosenPressed = () => {
    if (!allChosen) {
      setAllChosen(true);
      Object.keys(teamMembers).map((user) => {
        return activeEvent != null &&
          activeTeam.members[teamMembers[user].id] == true
          ? events[activeEvent.eventId].participants == undefined ||
            events[activeEvent.eventId].participants[teamMembers[user].id] ==
            undefined
            ? addToInvitationList(teamMembers[user].id)
            : null
          : null;
      });
    } else {
      setAllChosen(false);
      Object.keys(teamMembers).map((user) => {
        return activeEvent != null &&
          activeTeam.members[teamMembers[user].id] == true
          ? events[activeEvent.eventId].participants == undefined ||
            events[activeEvent.eventId].participants[teamMembers[user].id] ==
            undefined
            ? removeFromInvitationList(teamMembers[user].id)
            : null
          : null;
      });
    }
  };

  return (
    <View style={styles.modal}>
      {activeEvent != null ? (
        <View>
          <View style={styles.modalEvents}>
            {activeTeam.members[currentUser.id] == "coach" ? (
              <TouchableOpacity
                onPress={() => onChangePressed()}
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: "#A247D4", fontSize: 18, padding: 5 }}>
                  Edit
                </Text>
                <Icon name="pencil" size={18} color="#A247D4"></Icon>
              </TouchableOpacity>
            ) : null}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.modalTitle}>{activeEvent.title}</Text>
              <View
                style={[
                  styles.type,
                  {
                    backgroundColor:
                      activeEvent.type == "game"
                        ? "#007E34"
                        : activeEvent.type == "practice"
                          ? "#A247D4"
                          : activeEvent.type == "other"
                            ? "#FF6347"
                            : null,
                  },
                ]}
              >
                <Text style={styles.typeText}>{activeEvent.type}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="calendar-outline" size={20} color="#A247D4"></Icon>
              <Text style={styles.dateTimePlace}>{activeEvent.date}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="time-outline" size={20} color="#A247D4"></Icon>
              <Text style={styles.dateTimePlace}>{activeEvent.time}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="pin-outline" size={20} color="#A247D4"></Icon>
              <Text style={styles.dateTimePlace}>{activeEvent.place}</Text>
            </View>
            <Text style={[styles.subTitle, { margin: 0 }]}>Description</Text>
            <Text style={styles.description}>{activeEvent.description}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>Participants</Text>
            {activeEvent != null &&
              events[activeEvent.eventId].participants != undefined &&
              events[activeEvent.eventId].participants[currentUser.id] ==
              "pending" ? (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      style={[styles.editButton, { width: null }]}
                      onPress={() => onAcceptPressed()}
                    >
                      <Text style={styles.buttonText}>Going</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttonSkip, { width: null }]}
                      onPress={() => onDeclinePressed()}
                    >
                      <Text style={styles.textStyleSkip}>Not Going</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

            {activeTeam.members[currentUser.id] == "coach" ? (
              <TouchableOpacity
                onPress={() => onInvitePressed()}
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexDirection: "row",
                  marginBottom: 10,
                  margin: 5,
                }}
              >
                <Text style={{ color: "#A247D4", fontSize: 18, padding: 5 }}>
                  Invite
                </Text>
                <Icon
                  name="add-circle-outline"
                  size={18}
                  color="#A247D4"
                ></Icon>
              </TouchableOpacity>
            ) : null}
          </View>

          {events[activeEvent.eventId].participants != undefined ? (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.subTitle}>Going</Text>
                <Text style={styles.numOfUsers}>
                  {
                    Object.values(
                      events[activeEvent.eventId].participants
                    ).filter((obj) => obj == true).length
                  }
                </Text>
              </View>
              <ScrollView horizontal={true}>
                {Object.keys(teamMembers).map((userId, i) => {
                  return activeEvent != null &&
                    events[activeEvent.eventId].participants[
                    teamMembers[userId].id
                    ] == true ? (
                      <View style={styles.modalUser} key={i}>
                        {teamMembers[userId].profilePicture != undefined ? (
                          <Image
                            source={{
                              uri: teamMembers[userId].profilePicture,
                            }}
                            style={styles.image}
                          />
                        ) : (
                            <View style={styles.initialCircle}>
                              <Text style={styles.initialText}>
                                {teamMembers[userId].firstName[0]}
                                {teamMembers[userId].lastName[0]}
                              </Text>
                            </View>
                          )}
                        <Text style={styles.userName}>
                          {teamMembers[userId].firstName}{" "}
                          {teamMembers[userId].lastName}
                        </Text>
                      </View>
                    ) : null;
                })}
              </ScrollView>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.subTitle}>Not Going</Text>
                <Text style={styles.numOfUsers}>
                  {
                    Object.values(
                      events[activeEvent.eventId].participants
                    ).filter((obj) => obj == false).length
                  }
                </Text>
              </View>
              <ScrollView horizontal={true}>
                {Object.keys(teamMembers).map((userId, i) => {
                  return activeEvent != null &&
                    events[activeEvent.eventId].participants[
                    teamMembers[userId].id
                    ] == false ? (
                      <View style={styles.modalUser} key={i}>
                        {teamMembers[userId].profilePicture != undefined ? (
                          <Image
                            source={{
                              uri: teamMembers[userId].profilePicture,
                            }}
                            style={styles.image}
                          />
                        ) : (
                            <View style={styles.initialCircle}>
                              <Text style={styles.initialText}>
                                {teamMembers[userId].firstName[0]}
                                {teamMembers[userId].lastName[0]}
                              </Text>
                            </View>
                          )}
                        <Text style={styles.userName}>
                          {teamMembers[userId].firstName}{" "}
                          {teamMembers[userId].lastName}
                        </Text>
                      </View>
                    ) : null;
                })}
              </ScrollView>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.subTitle}>Pending</Text>
                <Text style={styles.numOfUsers}>
                  {
                    Object.values(
                      events[activeEvent.eventId].participants
                    ).filter((obj) => obj == "pending").length
                  }
                </Text>
              </View>
              <ScrollView horizontal={true}>
                {Object.keys(teamMembers).map((userId, i) => {
                  return activeEvent != null &&
                    events[activeEvent.eventId].participants[
                    teamMembers[userId].id
                    ] == "pending" ? (
                      <View style={styles.modalUser} key={i}>
                        {teamMembers[userId].profilePicture != undefined ? (
                          <Image
                            source={{
                              uri: teamMembers[userId].profilePicture,
                            }}
                            style={styles.image}
                          />
                        ) : (
                            <View style={styles.initialCircle}>
                              <Text style={styles.initialText}>
                                {teamMembers[userId].firstName[0]}
                                {teamMembers[userId].lastName[0]}
                              </Text>
                            </View>
                          )}
                        <Text style={styles.userName}>
                          {teamMembers[userId].firstName}{" "}
                          {teamMembers[userId].lastName}
                        </Text>
                      </View>
                    ) : null;
                })}
              </ScrollView>
            </View>
          ) : null}
        </View>
      ) : null}

      <Modal animationType="fade" transparent={true} visible={editModalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.subTitle}>Edit Event</Text>
              <TouchableOpacity onPress={() => onCancel()}>
                <Icon
                  name="close-circle-sharp"
                  size={30}
                  color="#DDDDDD"
                ></Icon>
              </TouchableOpacity>
            </View>
            {sureRemoveVisible ? <Text> Are you sure?</Text> : null}

            {!editVisible ? (
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                {!sureRemoveVisible && !editVisible ? (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => onEditPressed()}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  style={styles.buttonRemove}
                  onPress={() => onDeletePressed()}
                >
                  <Text style={styles.buttonText}>
                    {!sureRemoveVisible ? "Delete Event" : "Yes, delete"}
                  </Text>
                </TouchableOpacity>
                {sureRemoveVisible ? (
                  <TouchableOpacity
                    style={styles.buttonSkip}
                    onPress={() => setSureRemoveVisible(false)}
                  >
                    <Text style={styles.textStyleSkip}>No</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : (
                <EditEvent
                  activeEvent={activeEvent}
                  onClose={onClose}
                  onCancel={onCancel}
                />
              )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={inviteModalVisible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.subTitle}>Invite Members</Text>
              <TouchableOpacity onPress={() => onCancel()}>
                <Icon
                  name="close-circle-sharp"
                  size={30}
                  color="#DDDDDD"
                ></Icon>
              </TouchableOpacity>
            </View>

            {activeEvent &&
              events[activeEvent.eventId].participants != undefined &&
              Object.keys(events[activeEvent.eventId].participants).length ==
              Object.values(activeTeam.members).filter((obj) => obj == true)
                .length ? (
                <Text style={styles.description}>
                  Everybody in the team is already invited!
                </Text>
              ) : (
                <View style={{ maxHeight: screenHeight * 0.6 }}>
                  <View style={styles.invitationBox}>
                    <Text style={{ fontWeight: "bold" }}>Invite all</Text>
                    <TouchableOpacity onPress={() => allChosenPressed()}>
                      {allChosen ? (
                        <Icon name="close-circle" size={35} color="green"></Icon>
                      ) : (
                          <Icon
                            name="add-circle-outline"
                            size={35}
                            color="green"
                          ></Icon>
                        )}
                    </TouchableOpacity>
                  </View>

                  <ScrollView>
                    {Object.keys(teamMembers).map((user, i) => {
                      return activeEvent != null &&
                        activeTeam.members[teamMembers[user].id] == true ? (
                          <View key={i}>
                            {events[activeEvent.eventId].participants ==
                              undefined ||
                              events[activeEvent.eventId].participants[
                              teamMembers[user].id
                              ] == undefined ? (
                                <MemberInvitationBox
                                  user={teamMembers[user]}
                                  addToInvitationList={addToInvitationList}
                                  removeFromInvitationList={removeFromInvitationList}
                                  allChosen={allChosen}
                                />
                              ) : null}
                          </View>
                        ) : null;
                    })}
                  </ScrollView>

                  <TouchableOpacity
                    style={styles.invitationButton}
                    onPress={() => onSendInvitations()}
                  >
                    <Text style={styles.buttonText}>Send Invitations</Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  modalEvents: {
    padding: 20,
    margin: 1,
    padding: 15,
    paddingLeft: 10,
  },
  dateTimePlace: {
    fontSize: 16,
    color: "#333",
    margin: 5,
  },
  modal: {
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    width: "75%",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  modalUser: {
    padding: 5,
    margin: 5,
    alignItems: "center",
  },
  userName: {
    fontSize: 12,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  initialCircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  type: {
    backgroundColor: "#007E34",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  typeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    margin: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modalView: {
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.7,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonRemove: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#FF6347",
    margin: 10,
    width: "40%",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleSkip: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonSkip: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#DDDDDD",
    margin: 10,
    width: "40%",
    justifyContent: "center",
  },
  editButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#007E34",
    margin: 10,
    width: "40%",
    justifyContent: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invitationButton: {
    backgroundColor: "#007E34",
    marginVertical: 20,
    marginHorizontal: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  numOfUsers: {
    fontSize: 18,
    fontWeight: "bold",
    opacity: 0.6,
  },
  invitationBox: {
    marginVertical: 2,
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default EventModule;
