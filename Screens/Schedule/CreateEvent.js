import { StyleSheet } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import { createEvent } from "../../actions/indexSchedule";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Alert } from "react-native";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("other");
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { activeTeam } = useSelector((state) => state.currentTeams);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onCreatePress = () => {
    if (title == "") {
      Alert.alert(
        "An event must have a title"
      )
    }
    else if (place == "") {
      Alert.alert(
        "An event must have a location"
      )
    }
    else {
      dispatch(
        createEvent(
          activeTeam.teamId,
          date,
          title,
          type,
          place,
          description,
          activeTeam.members
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <ScrollView>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
          >
            <Text style={styles.title}>Create Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
            <View style={styles.typeContainer}>
              <Text style={styles.typeText}>Event Type</Text>
              <TouchableOpacity
                style={type == "game" ? styles.typeChosenGame : styles.type}
                onPress={() => setType("game")}
              >
                <Text style={styles.buttonText}>Game</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={type == "practice" ? styles.typeChosenPractice : styles.type}
                onPress={() => setType("practice")}
              >
                <Text style={styles.buttonText}>Practice</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={type == "other" ? styles.typeChosenOther : styles.type}
                onPress={() => setType("other")}
              >
                <Text style={styles.buttonText}>Other</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dateTimeContainer}>
              <View style={styles.dateTime}>
                <Icon name="calendar-outline" size={25} color="#DDDDDD"></Icon>
                <DateTimePicker
                  style={styles.dateTimePicker}
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              </View>
              <View style={styles.dateTime}>
                <Icon name="time-outline" size={25} color="#DDDDDD"></Icon>
                <DateTimePicker
                  style={styles.dateTimePicker}
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  display="default"
                  onChange={onDateChange}
                />
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder="Place"
              onChangeText={(text) => setPlace(text)}
              value={place}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.inputDescription}
              placeholderTextColor="#aaaaaa"
              placeholder="Description"
              onChangeText={(text) => setDescription(text)}
              value={description}
              autoCapitalize="none"
              multiline
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => onCreatePress()}
            >
              <Text style={styles.buttonTitle}> Create </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Actions.pop()}>
              <Text style={styles.cancelText}> Cancel </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  input: {
    fontSize: 16,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    marginHorizontal: 20,
  },
  inputDescription: {
    fontSize: 16,
    minHeight: 60,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingLeft: 10,
    backgroundColor: "#DDDDDD",
  },
  button: {
    backgroundColor: "#007E34",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  cancelText: {
    fontSize: 16,
    color: "#A247D4",
    margin: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  dateTimePicker: {
    margin: 5,
    width: "50%",
  },
  dateTime: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
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
  },
  typeChosenGame: {
    backgroundColor: "#007E34",
    padding: 12,
    borderRadius: 10,
    opacity: 10,
  },
  typeChosenPractice: {
    backgroundColor: "#A247D4",
    padding: 12,
    borderRadius: 10,
    opacity: 10,
  },
  typeChosenOther: {
    backgroundColor: "#FF6347",
    padding: 12,
    borderRadius: 10,
    opacity: 10,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  typeText: {
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
