import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { set } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";

const MemberInvitationBox = ({
  user,
  addToInvitationList,
  removeFromInvitationList,
  allChosen,
}) => {
  useEffect(() => {
    setPlayerChosen(allChosen);
  }, [allChosen]);

  const [playerChosen, setPlayerChosen] = useState(false);

  const onPlayerChosen = () => {
    if (!playerChosen) {
      addToInvitationList(user.id);
      setPlayerChosen(!playerChosen);
    } else {
      removeFromInvitationList(user.id);
      setPlayerChosen(!playerChosen);
    }
  };

  return (
    <View style={styles.invitationBox}>
      <Text>
        {user.firstName} {user.lastName}
      </Text>
      <TouchableOpacity onPress={() => onPlayerChosen()}>
        {playerChosen ? (
          <Icon name="close-circle" size={35} color="green"></Icon>
        ) : (
          <Icon name="add-circle-outline" size={35} color="green"></Icon>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  invitationBox: {
    marginVertical: 2,
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default MemberInvitationBox;
