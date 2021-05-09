import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  RefreshControl,
} from "react-native";
import TopMenu from "./TopMenu";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import { createComment } from "../actions/index";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function CommentScreen(post) {
  const [commentText, setCommentText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onCreateComment = () => {
    if (commentText != "") {
      dispatch(
        createComment(
          post.postId,
          commentText,
          currentUser.firstName,
          currentUser.lastName
        )
      );
      setCommentText("");
    }
  };

  const onCancelPress = () => {
    // Här vill vi ändra så man kmr tillbaka till feedet, men vet inte hur utan att tappa bottommenu
    Actions.pop();
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu />

      <View style={styles.postBox}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <View>
            <Text style={styles.postName}>{post.author}</Text>
            <Text style={styles.postDate}>
              {new Date(post.createdOn).toString().substring(0, 16)}
            </Text>
            <Text style={styles.postText}>{post.text}</Text>
          </View>
        </View>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          ></RefreshControl>
        }
        data={post.comments && Object.keys(post.comments)}
        renderItem={({ item }) => (
          <View style={styles.commentBorder}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text>{post.comments[item].author}</Text>
              </View>
            </View>
            <Text>{post.comments[item].text}</Text>
          </View>
        )}
      ></FlatList>
      <View style={styles.inputBox}>
        <TextInput
          placeholder={"Type your comment here"}
          onChangeText={(text) => setCommentText(text)}
          value={commentText}
          multiline
          style={styles.input}
        ></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onCreateComment()}
        >
          {commentText == "" ? (
            <Icon
              name="chatbubble-ellipses-outline"
              size={25}
              color="white"
            ></Icon>
          ) : (
            <Icon name="arrow-up-outline" size={25} color="white"></Icon>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onCancelPress()}>
        <Text style={styles.cancel}> Cancel </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postBox: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    alignItems: "flex-start",
    padding: 5,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    margin: 10,
  },
  postName: {
    fontSize: 20,
    padding: 5,
    fontWeight: "bold",
  },
  postText: {
    fontSize: 18,
    marginTop: 5,
    padding: 5,
  },
  postDate: {
    fontSize: 12,
    color: "#333",
    paddingLeft: 5,
  },
  commentBorder: {
    margin: 10,
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "green",
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cancel: {
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
  input: {
    borderWidth: 0.25,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    width: "80%",
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
});
