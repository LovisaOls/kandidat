import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  Platform,
} from "react-native";
import TeamComponent from "./TeamComponent";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

import "firebase/database";
require("firebase/auth");
import * as firebase from "firebase";

import * as ImagePicker from "expo-image-picker";
import { updateUser } from "../../actions/index";


function MyProfileScreen() {
  const currentUser = useSelector((state) => state.currentUser);

  const { userTeams } = useSelector((state) => state.currentTeams);
  //FUNKTIONER
  const onAddTeamPressed = () => {
    Actions.TeamRegistration();
  };

  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Signed Out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const addProfilePic = () => {
    setModalVisible(true);
  };

  const cancel = () => {
    setModalVisible(false);
    setImage(null);
  };

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
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.image,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadProfilePic = async () => {
    let url = await uploadImage();
    changeUser(url)
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

      return url = snapshot.ref.getDownloadURL();
    }
  };

  const changeUser = (url) => {
    console.log(url)
    console.log(currentUser)
    dispatch(updateUser(currentUser.id, url));
    cancel();
  };

  return (
    <SafeAreaView keyboardShouldPersistTaps="always" style={styles.container}>
      <ScrollView>
        <View style={styles.profileIcon}>
          <TouchableOpacity onPress={() => addProfilePic()}>
            {currentUser && currentUser.profilePicture ? (
              <Image
                source={{
                  uri: currentUser.profilePicture,
                }}
                style={styles.image}
              />
            ) : (
              <View style={styles.initialCircle}>
                <Icon style={styles.initialText} name="person-outline"></Icon>
              </View>
            )}
          </TouchableOpacity>

          <View>
            <Text style={styles.name}>
              {currentUser && currentUser.firstName}{" "}
              {currentUser && currentUser.lastName}
            </Text>
            <Text style={styles.email}>{currentUser && currentUser.email}</Text>
          </View>
        </View>
        <View style={styles.myTeamsHeader}>
          <Text style={styles.title}> My Teams </Text>
          <TouchableOpacity
            style={styles.addTeamBtn}
            onPress={() => onAddTeamPressed()}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.teamsBox}>
          {userTeams &&
            Object.keys(userTeams).map((key) => {
              return <TeamComponent key={key} team={userTeams[key]} />;
            })}
        </View>
        <View>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => onSignOut()}
          >
            <Text style={styles.buttonText}> Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => cancel()}
        >
          <View style={styles.modalView}>
            <Text style={styles.title}>
              Do you want to change your profile picture?
            </Text>

            {image ? (
              <TouchableOpacity onPress={pickImage}>
                <Image source={{ uri: image }} style={styles.image} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.noImage} onPress={pickImage}>
                <Text style={styles.imageText}>Open picture library</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={() => uploadProfilePic()}
            >
              <Text style={styles.buttonText}>Change my profile picture</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
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
  profileIcon: {
    marginTop: 30,
    flexDirection: "row",
  },
  image: {
    height: screenWidth * 0.3,
    width: screenWidth * 0.3,
    borderRadius: (screenWidth * 0.3) / 2,
    margin: 10,
  },
  name: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
    marginTop: 20,
    fontWeight: "bold",
  },
  email: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  myTeamsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  teamsBox: {
    margin: 10,
  },
  addTeamBtn: {
    width: "15%",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007E34",
    marginLeft: 40,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    margin: 10,
  },
  signOutButton: {
    backgroundColor: "#007E34",
    marginVertical: 20,
    marginHorizontal: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  initialCircle: {
    height: screenWidth * 0.3,
    width: screenWidth * 0.3,
    borderRadius: (screenWidth * 0.3) / 2,
    margin: 10,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
    color: "white",
    fontSize: 60,
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
    width: screenWidth * 0.95,
    height: screenWidth * 0.95,
  },
  noImage: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    borderRadius: 80,
    margin: 30,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    color: "#aaaaaa",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
});

export default MyProfileScreen;
