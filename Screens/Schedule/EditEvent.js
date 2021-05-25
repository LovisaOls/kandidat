import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import { updateEvent } from "../../actions/indexSchedule";

const EditEvent = ({ activeEvent, onClose, onCancel }) => {
  const [title, setTitle] = useState(activeEvent.title);
  const [type, setType] = useState(activeEvent.type);
  const [place, setPlace] = useState(activeEvent.place);
  const [description, setDescription] = useState(activeEvent.description);

  const dispatch = useDispatch();

  const onUpdatePressed = () => {
    dispatch(
      updateEvent(
        activeEvent.eventId,
        title,
        type,
        place,
        description,
        activeEvent.date,
        activeEvent.time
      )
    );
    onClose();
    onCancel();
  };
  return (
    <ScrollView>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <View>
          <Text style={styles.text}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <Text style={styles.text}>Event Type</Text>

          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={type == "game" ? styles.typeChosen : styles.type}
              onPress={() => setType("game")}
            >
              <Text style={styles.buttonText}>Game</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={type == "practice" ? styles.typeChosen : styles.type}
              onPress={() => setType("practice")}
            >
              <Text style={styles.buttonText}>Practice</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={type == "other" ? styles.typeChosen : styles.type}
              onPress={() => setType("other")}
            >
              <Text style={styles.buttonText}>Other</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}> Place</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Place"
            onChangeText={(text) => setPlace(text)}
            value={place}
            autoCapitalize="none"
          />
          <Text style={styles.text}> Description</Text>

          <TextInput
            style={styles.inputDescription}
            placeholderTextColor="#aaaaaa"
            placeholder="Description"
            onChangeText={(text) => setDescription(text)}
            value={description}
            autoCapitalize="none"
            multiline
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onUpdatePressed()}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    fontSize: 16,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 10,
    marginHorizontal: 20,
  },
  inputDescription: {
    fontSize: 16,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 10,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#007E34",
    marginVertical: 20,
    marginHorizontal: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  type: {
    backgroundColor: "#DDDDDD",
    padding: 8,
    borderRadius: 10,
    opacity: 10,
    margin: 5,
  },
  typeChosen: {
    backgroundColor: "#007E34",
    padding: 12,
    borderRadius: 10,
    opacity: 10,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    margin: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
});
export default EditEvent;
