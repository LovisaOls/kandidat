import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../../actions/index";
import { like } from "../../actions/index";

import { removeLike } from "../../actions/index";
import { removePost } from "../../actions/index";
import Swipeable from "react-native-gesture-handler/Swipeable";

const Posts = ({ item, onOpenComments, setActivePost }) => {
  const currentUser = useSelector((state) => state.currentUser);

  const { activeTeam } = useSelector((state) => state.currentTeams);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed(activeTeam.teamId));
  }, [dispatch]);

  const { feedPosts } = useSelector((state) => state.feedPosts);

  const onLikePressed = (post) => {
    let alreadyLiked = false;
    if (post.likes != undefined) {
      console.log(currentUser.id);
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
      } else {
        dispatch(like(post.postId, currentUser.id));
      }
    } else {
      dispatch(like(post.postId, currentUser.id));
    }
  };

  const swipeableRef = useRef(null);
  const deletePost = (post) => {
    setActivePost(null);
    dispatch(removePost(post.postId));
    swipeableRef.current.close();
  };

  return (
    <View>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={() => (
          <Text>
            <TouchableOpacity>
              <Icon
                name="ios-trash-outline"
                size={35}
                onPress={() => deletePost(feedPosts[item])}
                color={
                  feedPosts[item].authorId == currentUser.id ? "black" : "white"
                }
              ></Icon>
            </TouchableOpacity>
          </Text>
        )}
        friction={feedPosts[item].authorId == currentUser.id ? 2 : 1000}
      >
        <View style={styles.postBorder}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {currentUser.profilePicture ? (
              <Image
                source={{ uri: currentUser.profilePicture }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
            ) : (
              <Icon name="person-circle-outline" size={45}></Icon>
            )}
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
                  <TouchableOpacity
                    onPress={() => onLikePressed(feedPosts[item])}
                    style={styles.likeBox}
                  >
                    <Icon name="heart-dislike" size={23} color="tomato"></Icon>
                    <Text style={styles.likeCommentText}>
                      Dislike{" "}
                      {feedPosts[item].likes &&
                        Object.keys(feedPosts[item].likes).length}{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    style={styles.likeBox}
                    onPress={() => onLikePressed(feedPosts[item])}
                  >
                    <Icon name="heart" size={23} color="tomato"></Icon>

                    <Text style={styles.likeCommentText}>
                      Like{" "}
                      {feedPosts[item].likes &&
                        Object.keys(feedPosts[item].likes).length}{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View>
              <TouchableOpacity
                style={styles.commentBox}
                title="Comment"
                onPress={() => onOpenComments(feedPosts[item])}
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
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 16,
    margin: 10,
  },
  postDate: {
    fontSize: 12,
    color: "#333",
  },
  likeCommentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
});

export default Posts;
