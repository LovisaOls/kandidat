import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  TextInput,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Modalize } from "react-native-modalize";
import TopMenu from "../TopMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../../actions/index";
import { createComment } from "../../actions/index";
import firebase from "firebase/app";
import "firebase/database";
import { Actions } from "react-native-router-flux";
require("firebase/auth");
import Posts from "./Posts";

export default function Feed() {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const currentUser = useSelector((state) => state.currentUser);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const { activeTeam } = useSelector((state) => state.currentTeams);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed(activeTeam.teamId));
  }, [dispatch]);

  const { feedPosts } = useSelector((state) => state.feedPosts);

  const onCreateFeedPressed = () => {
    Actions.CreateFeed();
  };

  const onCreateComment = () => {
    if (commentText != "") {
      dispatch(
        createComment(
          feedPosts[activePost].postId,
          commentText,
          currentUser.firstName,
          currentUser.lastName
        )
      );
      setCommentText("");
    }
  };

  const modalRef = useRef(null);
  const [activePost, setActivePost] = useState(null);
  const [commentText, setCommentText] = useState("");

  const onOpenComments = (post) => {
    setActivePost(post.postId);
    const modal = modalRef.current;

    if (modal) {
      modal.open();
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

      <View style={styles.postsContainer}>
        {feedPosts != undefined ? (
          <FlatList
            data={feedPosts && Object.keys(feedPosts).reverse()}
            renderItem={({ item, index }) => (
              <Posts item={item} onOpenComments={onOpenComments} />
            )}
          >
            keyExtractor={(item) => item.createdOn + ""}
          </FlatList>
        ) : (
          <View>
            <Text style={styles.noPostsText}>
              Click on the plus to create the first post!
            </Text>
          </View>
        )}
      </View>

      {/* Här börjar model */}
      <Modalize ref={modalRef} modalHeight={screenHeight * 0.8}>
        <View style={styles.modal}>
          <Text style={styles.title}> Comments </Text>
          {activePost != null ? (
            <View>
              <View style={styles.modalPost}>
                <Text style={styles.postName}>
                  {feedPosts[activePost].author}
                </Text>
                <Text style={styles.postDate}>
                  {new Date(feedPosts[activePost].createdOn)
                    .toString()
                    .substring(0, 16)}
                </Text>
                <Text style={styles.postText}>
                  {feedPosts[activePost].text}
                </Text>
              </View>
              <FlatList
                data={
                  feedPosts[activePost].comments &&
                  Object.keys(feedPosts[activePost].comments)
                }
                renderItem={({ item }) => (
                  <View style={styles.commentBorder}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View>
                        <Text style={{ fontWeight: "bold" }}>
                          {feedPosts[activePost].comments[item].author}
                        </Text>
                      </View>
                    </View>
                    <Text>{feedPosts[activePost].comments[item].text}</Text>
                  </View>
                )}
              ></FlatList>
            </View>
          ) : null}
          <View style={styles.inputBox}>
            <View>
              <TextInput
                placeholder={"Type your comment here"}
                onChangeText={(text) => setCommentText(text)}
                value={commentText}
                multiline
                style={styles.input}
              ></TextInput>
            </View>
            <View>
              <TouchableOpacity
                style={styles.commentButton}
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
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  postName: {
    fontSize: 20,
  },
  postText: {
    fontSize: 16,
    margin: 10,
  },
  postDate: {
    fontSize: 12,
    color: "#333",
  },
  postsContainer: {
    height: "80%",
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
  },
  input: {
    fontSize: 16,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    paddingLeft: 16,
    marginHorizontal: 15,
    width: screenWidth * 0.65,
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
  commentButton: {
    backgroundColor: "green",
    height: screenWidth * 0.15,
    width: screenWidth * 0.15,
    borderRadius: (screenWidth * 0.15) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalPost: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#DDDDDD",
    marginBottom: 5,
    paddingBottom: 5,
  },
  initialCircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 5,
    marginRight: 10,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
