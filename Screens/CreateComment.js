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
} from "react-native";
import TopMenu from "../Screens/TopMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../actions/index";

import firebase from "firebase/app";
import "firebase/database";
import { Actions } from "react-native-router-flux";
require("firebase/auth");

import CommentComponent from "./CommentComponent";

// här håller vi på och grejar

export default function CreateComment() {
    const [isLoading, setLoading] = useState(false);
    const [listData, setListData] = useState([]);

    const {activePost} = useSelector(state => state.feedPosts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFeed(activeTeam.teamId));
    }, [dispatch]);

    console.log("here coms activepost", activePost);

    return (

        <View >
            {feedPosts && Object.keys(feedPosts).map((key) => {
                console.log("inne i loop");
                console.log(feedPosts[key]);
                if (feedPosts[key].postId == activePost.postId) {
                    
                    console.log("here is post that is matching yes");
                    return <CommentComponent key={key} post={feedPosts[key]} />;
                }

            })}
        </View>
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
        fontSize: 12,
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
