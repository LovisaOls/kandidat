import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Title,
  SafeAreaView,
  TextInput,
} from "react-native";
import TopMenu from "./TopMenu";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";

import { createComment } from "../actions/index";

import "firebase/database";
require("firebase/auth");

export default function CommentScreen(post) {
  const [commentText, setCommentText] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const onCreateComment = () => {
    dispatch(
      createComment(
        post.postId,
        commentText,
        currentUser.firstName,
        currentUser.lastName
      )
    );
  };

  const { feedPosts } = useSelector((state) => state.feedPosts);

  const onCancelPress = () => {
    // Här vill vi ändra så man kmr tillbaka till feedet, men vet inte hur utan att tappa bottommenu
    Actions.Profile();
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
      
      <TextInput
        placeholder={"Type your comment here"}
        numberOfLines={5}
        onChangeText={(text) => setCommentText(text)}
        value={commentText}
      ></TextInput>
      <TouchableOpacity
        style={styles.createCommentButton}
        onPress={() => onCreateComment()}
      >
        <Text>Create comment</Text>
      </TouchableOpacity>
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
    backgroundColor: "#D3D3D3",
    margin: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    margin: 10,
  },
  postName: {
    fontSize: 20,
    padding: 5,
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
  createCommentButton: {
    backgroundColor: "#A247D4",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
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
});
