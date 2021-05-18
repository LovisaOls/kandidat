import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "react-native-router-flux";
import { registerTeam, joinTeam, fetchAllTeams } from "../actions/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

function TeamRegistration() {
  const [teamName, setTeamName] = useState("");
  const [city, setCity] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const [image, setImage] = useState(null);
  const { allTeams } = useSelector((state) => state.currentTeams);
  const [join, setJoin] = useState(true);

  const [data, setData] = useState(null);
  const searchData = allTeams != undefined ? Object.keys(allTeams) : null;

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("You have not allowed premission to your cameraroll");
        }
      }
    })();
    dispatch(fetchAllTeams());
  }, [dispatch]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.image,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.2,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (image != null) {
      let filename = image.split("/").pop();
      const response = await fetch(image);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref()
        .child("images/" + filename);
      const snapshot = await ref.put(blob);
      blob.close();
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(registerTeam(currentUser.id, teamName, city, url));
      });
    } else {
      dispatch(registerTeam(currentUser.id, teamName, city, image));
    }
  };

  const searchFunction = (text) => {
    if (text != "") {
      const newData = searchData.filter((item) => {
        const itemData = `${allTeams[item].teamName.toUpperCase()}   
      ${allTeams[item].teamId.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    } else {
      setData(null);
    }
  };

  const addTeamButtonPressed = async () => {
    if (teamName != "" && city != "") {
      await uploadImage();
    } else {
      Alert.alert(
        "Empty fields...",
        "Please make sure you have filled in both a city and a name for your team"
      );
      return;
    }
  };

  const onJoinTeamPress = (teamId) => {
    if (teamId != "") {
      dispatch(joinTeam(currentUser.id, teamId));
    }
  };

  const onCancelPress = () => {
    Actions.pop();
  };

  return (
    <SafeAreaView keyboardShouldPersistTaps="always" style={styles.container}>
      <Text style={styles.title}>Add Team</Text>
      <View style={styles.modeButtonsView}>
        <TouchableOpacity
          style={styles.modeButtons}
          onPress={() => setJoin(true)}
        >
          <Text style={join ? styles.modeChosen : styles.modeButtonsText}>
            Join Team
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modeButtons}
          onPress={() => setJoin(false)}
        >
          <Text style={!join ? styles.modeChosen : styles.modeButtonsText}>
            Create Team
          </Text>
        </TouchableOpacity>
      </View>
      {join ? (
        <View style={styles.modeBox}>
          <View style={styles.inputView}>
            <Icon name="search" color={"#aaaaaa"} size={18}></Icon>
            <TextInput
              style={styles.input}
              placeholder="Enter Team Name or TeamId..."
              onChangeText={(text) => searchFunction(text)}
              autoCorrect={false}
            />
          </View>

          {allTeams != undefined ? (
            <FlatList
              data={data}
              keyExtractor={(item) => allTeams[item].teamId}
              renderItem={({ item }) => (
                <View style={styles.teamBox}>
                  <View>
                    <Text style={styles.teamName}>
                      {allTeams[item].teamName}
                    </Text>
                    <Text>TeamId: {allTeams[item].teamId}</Text>
                  </View>
                  {currentUser.teams[item] == undefined ? (
                    <TouchableOpacity
                      style={styles.joinButton}
                      onPress={() => onJoinTeamPress(allTeams[item].teamId)}
                    >
                      <Text style={styles.buttonText}>Join</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              )}
            ></FlatList>
          ) : null}
        </View>
      ) : (
        <ScrollView style={styles.modeBox}>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {image ? (
                  <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: image }} style={styles.image} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.image} onPress={pickImage}>
                    <Text style={styles.imageText}>Add Team Picture</Text>
                  </TouchableOpacity>
                )}
                <View>
                  <TextInput
                    style={styles.inputNewTeam}
                    placeholder="Team name"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setTeamName(text)}
                    value={teamName}
                    autoCapitalize="none"
                  ></TextInput>

                  <TextInput
                    style={styles.inputNewTeam}
                    placeholder="City"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setCity(text)}
                    value={city}
                    autoCapitalize="none"
                  ></TextInput>
                </View>
              </View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => addTeamButtonPressed()}
              >
                <Text style={styles.buttonText}> Create Team </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      )}
      <TouchableOpacity onPress={() => onCancelPress()}>
        <Text style={styles.cancelText}> Cancel </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    margin: 10,
  },
  inputView: {
    fontSize: 16,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    paddingLeft: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    height: 48,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 30,
    paddingLeft: 10,
    width: screenWidth * 0.8,
  },
  inputNewTeam: {
    fontSize: 16,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    paddingLeft: 10,
    margin: 10,
    width: screenWidth * 0.5,
  },
  submitButton: {
    backgroundColor: "#007E34",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 16,
    color: "#A247D4",
    margin: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  image: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageText: {
    color: "#aaaaaa",
    fontSize: 14,
    textAlign: "center",
  },
  teamBox: {
    marginHorizontal: 15,
    marginVertical: 2,
    padding: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  joinButton: {
    backgroundColor: "#007E34",
    borderRadius: 5,
    padding: 5,
  },
  modeButtonsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modeButtons: {
    padding: 5,
    margin: 5,
    borderBottomWidth: 0.5,
  },
  modeChosen: {
    fontSize: 18,
    margin: 5,
    fontWeight: "bold",
    color: "#A247D4",
  },
  modeButtonsText: {
    fontSize: 18,
    margin: 5,
    fontWeight: "bold",
  },
  modeBox: {
    maxHeight: "70%",
  },
});

export default TeamRegistration;
