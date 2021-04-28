import React, { useState } from "react";
import { Text, SafeAreaView, TextInput, StyleSheet,TouchableOpacity} from "react-native";
import {useSelector} from 'react-redux';

import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

import {Actions} from 'react-native-router-flux';

export default function CreateFeed() {
    const [textValue, setValue] = useState("");
    const dateTime = new Date();

    const currentUser = useSelector(state => state.currentUser);
    const {activeTeam} = useSelector(state => state.currentTeams);


    const onCancelPostPressed = () => {
        Actions.Feed();
    }

    const onPostInFeedPressed = () => {
        console.log("Posted in feed");

        const postRef = firebase.database().ref("/feed/").push();
        const postKey = postRef.key;
        console.log(postKey);

        postRef.set({
            author: currentUser.firstName + ' ' + currentUser.lastName,
            teamId: activeTeam.teamId,
            text: textValue,
            createdOn: dateTime.getTime(),
            postId: postKey,
        })
        .then(() => {
            // Skapa en reducer + action!! BOB
            /* navigation.navigate("Feed", {post: {
                name: "Namn",
                text: textValue,
                createdOn: dateTime.getTime()}}) */
        })
        .catch((error) => {
            alert(error)
        });
        Actions.BottomMenu();
}
    
    return (
        <SafeAreaView>
            <Text style={styles.title}>Create a Post</Text>

            <TextInput
            placeholder={"Add text to your post"}
            numberOfLines={5}
            value={textValue}
            onChangeText={(res) => {
                setValue(res)
            }}>
            </TextInput>
            
            <TouchableOpacity style={styles.addPostButton} onPress={() => onPostInFeedPressed()}>
                <Text style={styles.postText}>
                    Post in feed
                </Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.cancelPost} onPress={() => onCancelPostPressed()}>
                    Go back to feed
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10,
    },
    cancelPost: {
        fontSize: 15,
        color: 'blue',
        margin: 10,
        alignContent:'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    postText: {
        color: "white",
        margin: 15,
        textAlign: "center",
        margin: 10,
        borderRadius: 10
    },
    addPostButton: {
        top: 100,
        backgroundColor: 'green',
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    }
})