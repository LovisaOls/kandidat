import "firebase/database";
require("firebase/auth");
import * as firebase from "firebase";

export const fetchFeed = (teamId) => {
    return (dispatch) => {
      firebase
        .database()
        .ref("/feed/")
        .orderByChild("teamId")
        .equalTo(teamId)
        .limitToLast(25)
        .on("value", (snapshot) => {
          dispatch({ type: "FETCH_FEED", feedPosts: snapshot.val() });
        });
    };
  };

  export const createComment = (postId, commentText, firstname, lastname) => {
    return (dispatch) => {
      const commentRef = firebase
        .database()
        .ref(`/feed/${postId}/comments/`)
        .push();
      commentRef.set({
        authorFirstName: firstname,
        authorLastName: lastname,
        text: commentText,
      });
      dispatch({ type: "COMMENT_ADDED" });
    };
  };

  export const like = (postId, userId) => {
    return (dispatch) => {
      const likesRef = firebase
        .database()
        .ref(`/feed/${postId}/likes/`)
        .child(userId)
        .set(true);
    };
  };

  export const removeLike = (postId, userId) => {
    return (dispatch) => {
      firebase.database().ref(`/feed/${postId}/likes/${userId}`).remove();
    };
  };

  export const removePost = (postId) => {
    return (dispatch) => {
      firebase.database().ref(`/feed/${postId}`).remove();
    };
  };

  export const createPost = (currentUser, teamId, textValue) => {
    return () => {
      const dateTime = new Date();
      const postRef = firebase.database().ref("/feed/").push();
      const postKey = postRef.key;
  
      postRef
        .set({
          authorFirstName: currentUser.firstName,
          authorLastName: currentUser.lastName,
          authorId: currentUser.id,
          authorPicture: currentUser.profilePicture
            ? currentUser.profilePicture
            : null,
          teamId: teamId,
          text: textValue,
          createdOn: dateTime.getTime(),
          postId: postKey,
          comments: [],
          likes: [],
        })
        .catch((error) => {
          alert(error);
        });
    };
  };