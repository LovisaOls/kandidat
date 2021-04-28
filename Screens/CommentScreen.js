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
import { useDispatch, useSelector } from "react-redux";

import "firebase/database";
require("firebase/auth");

export default function CommentScreen(post) {
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
      <View style={styles.comBox}>
        <Text styles={styles.title}>  </Text>
      </View>
      <FlatList></FlatList>
      <TextInput
        placeholder={"Add text to your post"}
        numberOfLines={5}
        // value={textValue}
        onChangeText={(res) => {
          setValue(res);
        }}
      ></TextInput>
      <TouchableOpacity style={styles.createFeedButton}>
        <Text>Create comment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postText: {
    fontSize: 20,
    padding: 15,
  },
  title: {
    fontSize: 30,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    margin: 10,
  },
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
  },
  postText: {
    fontSize: 15,
    marginTop: 5,
  },
  postDate: {
    fontSize: 12,
    color: "#333",
  },
  likeCommentBox: {
    flexDirection: "row",
  },
  postBorder: {
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
  createFeedButton: {
    backgroundColor: "purple",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
