import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import TopMenu from "../Screens/TopMenu";

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <TopMenu />

      <View style={styles.feeds}>
        <Text style={styles.feedText}> Feed </Text>
        <TouchableOpacity style={styles.addFeedBtn}>
          <Text style={styles.addFeed}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.publishedFeeds}>
        <TouchableOpacity>
          <Text style={styles.theText}>BrommaP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  /* ------------------------------------------ */
  feeds: {
    flexDirection: "row",
    marginTop: 10,
  },

  feedText: {
    fontSize: 30,
  },

  addFeedBtn: {
    width: "15%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    marginLeft: 40,
  },

  /* ------------------------------------------ */

  publishedFeeds: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 30,
    borderStyle: "dashed",
    borderRadius: 1,
    borderColor: "green",
    borderWidth: 1,
  },

  theText: {
    fontSize: 20,
    padding: 10,
  },
});
