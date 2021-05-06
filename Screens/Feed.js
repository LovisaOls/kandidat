import React, { useState, useEffect, useRef } from "react";
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
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Modalize } from "react-native-modalize";
import TopMenu from "../Screens/TopMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../actions/index";
import { like } from "../actions/index";
import { removeLike } from "../actions/index";

import firebase from "firebase/app";
import "firebase/database";
import { Actions } from "react-native-router-flux";
require("firebase/auth");

export default function Feed() {
  const screenHeight = Dimensions.get("window").height;
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

  const modalRef = useRef(null);

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  const onLikePressed = (post) => {
    let alreadyLiked = false;

    // Kontrollerar om usern redan har likeat inlägget, då ska den inte få likea igen.
    if (post.likes != undefined) {
      console.log(currentUser.id);
      //Loopar igenom likesen på posten
      Object.keys(post.likes).every((i) => {
        console.log(i);
        if (i == currentUser.id) {
          alreadyLiked = true;
        } else {
          return true;
        }
      });
      console.log(alreadyLiked);
      if (alreadyLiked) {
        dispatch(removeLike(post.postId, currentUser.id));
        console.log("usern har gillat förut");
      } else {
        dispatch(like(post.postId, currentUser.id));
        console.log("usern har inte gillat förut");
      }
    } else {
      console.log("usern får gilla för ingen har gillat förut");
      dispatch(like(post.postId, currentUser.id));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu />
      <View style={styles.header}>
        <Text style={styles.title}>Feed</Text>
        <TouchableOpacity
          style={styles.smallBtn}
          onPress={() => onCreateFeedPressed()}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View>
      {feedPosts != undefined  ? (
      <FlatList
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
              <View>
                {feedPosts[item].likes &&
                feedPosts[item].likes[currentUser.id] ? (
                  <View>
                    <TouchableOpacity style={styles.likeBox}>
                      <Icon
                        name="heart-dislike"
                        size={23}
                        color="tomato"
                      ></Icon>
                      <Text
                        style={styles.likeCommentText}
                        onPress={() => onLikePressed(feedPosts[item])}
                      >
                        Dislike{" "}
                        {feedPosts[item].likes &&
                          Object.keys(feedPosts[item].likes).length}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity style={styles.likeBox}>
                      <Icon name="heart" size={23} color="tomato"></Icon>

                      <Text
                        style={styles.likeCommentText}
                        onPress={() => onLikePressed(feedPosts[item])}
                      >
                        Like{" "}
                        {feedPosts[item].likes &&
                          Object.keys(feedPosts[item].likes).length}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={styles.commentBox}
                title="Comment"
                onPress={() => onCommentPressed(feedPosts[item])}
              >
                <Icon name="chatbubbles" size={23} color="#A247D4"></Icon>
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
      ) : (
        <View>
          <Text style={styles.noPostsText}> 
            There are no posts yet :( Click on the plus to create the first one and start chatting with your team!
          </Text>
        </View>
      )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  commentBox: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  likeBox: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  likeCommentText: {
    textAlign: "center",
    fontWeight: "bold",
    margin: 5,
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
    justifyContent: "space-evenly",
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
    backgroundColor: "green",
    color: "white",
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  smallBtn: {
    width: "15%",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    marginLeft: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  modal: {
    padding: 20,
  },
  noPostsText: {
    fontSize: 20,
    padding: 20,
  }
});
