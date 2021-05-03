import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  Title,
  SafeAreaView,
} from "react-native";
import TopMenu from "../Screens/TopMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../actions/index";
import { nrOfLikes } from "../actions/index";

import firebase from "firebase/app";
import "firebase/database";
import { Actions } from "react-native-router-flux";
require("firebase/auth");

export default function Feed() {
  const [isLoading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);

  const { activeTeam } = useSelector((state) => state.currentTeams);
  const dispatch = useDispatch();
  useEffect(() => {
    //fetchFeed();
    dispatch(fetchFeed(activeTeam.teamId));
  }, [dispatch]);

  const { feedPosts } = useSelector((state) => state.feedPosts);

  const onCreateFeedPressed = () => {
    Actions.CreateFeed();
  };

  const onCommentPressed = (post) => {
    Actions.Comment(post);
  };

  const onLikePressed = (post) => {
    let alreadyLiked = false;
    // Kontrollerar om usern redan har likeat inlägget, då ska den inte få likea igen.
    if (post.likes != undefined) {
      // Loopar likesen på posten
      Object.keys(post.likes).every((i) => {
        // Loopar vad usern har likeat
        Object.keys(currentUser.likes).every((j) => {
          if (j != i) {
            return true;
          } else {
            alreadyLiked = true;
          }
        });
        if (alreadyLiked) {
          return false;
        } else {
          return true;
        }
      });
      if ( alreadyLiked = false ) {
        // Här ser jag att usern som vill likea inte har gjort det innan :)
        console.log("nu har du likeat posten");
        dispatch(nrOfLikes(post.postId, currentUser.id));
      } 
      // Här ser jag att usern redan har likeat och här kan man lägga in tex att liken försvinner om man klickat typ... utvecklingspotential här
      else { console.log("ingen like för dig haha du har redan likeat ")}
    } else {
      dispatch(nrOfLikes(post.postId, currentUser.id));
      console.log(
        "usern får likea för den har inte gillat denna post förut"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={async () => {
              setLoading(true);
              await dispatch(fetchFeed(activeTeam.teamId));
              setLoading(false);
            }}
          ></RefreshControl>
        }
        data={feedPosts && Object.keys(feedPosts).reverse()}
        renderItem={({ item }) => (
          <View style={styles.postBorder}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text style={styles.postName}>{feedPosts[item].author}</Text>
                <Text style={styles.postDate}>
                  {new Date(feedPosts[item].createdOn)
                    .toString()
                    .substring(0, 16)}
                </Text>
              </View>
            </View>
            <Text style={styles.postText}>{feedPosts[item].text}</Text>

            <View style={styles.likeCommentBox}>
              <TouchableOpacity style={styles.likeBox}>
                <Text
                  style={styles.likeCommentText}
                  onPress={() => onLikePressed(feedPosts[item])}
                >
                  Like{" "}
                  {feedPosts[item].likes &&
                    Object.keys(feedPosts[item].likes).length}{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.commentBox}
                title="Comment"
                onPress={() => onCommentPressed(feedPosts[item])}
              >
                <Text style={styles.likeCommentText}>
                  Comment{" "}
                  {feedPosts[item].comments &&
                    Object.keys(feedPosts[item].comments).length}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      >
        keyExtractor={(item) => item.createdOn + ""}
      </FlatList>
      <TouchableOpacity
        style={styles.createFeedButton}
        onPress={() => onCreateFeedPressed()}
      >
        <Text>Create post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    margin: 10,
  },
  commentBox: {
    flex: 1,
    margin: 10,
  },
  likeBox: {
    flex: 1,
    margin: 10,
  },
  likeCommentText: {
    textAlign: "center",
    fontWeight: "bold",
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
    backgroundColor: "#A247D4",
    color: "white",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
