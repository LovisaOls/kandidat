import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, RefreshControl, Alert } from "react-native";

import firebase from "firebase/app";
import "firebase/database";
import { Navigation } from "react-native-navigation";
require("firebase/auth");

export default function Feed({navigation}) {
    const [isLoading, setLoading] = useState(false);
    const [listData, setListData] = useState([]);

    const onCreateFeedPressed = () => {
        navigation.navigate("CreateFeed")
    }

    useEffect(() => {
        fetchFeed();
    }, [])

    const fetchFeed = async () => {
        const res = await firebase.database().ref("/feed").once("value")
        var tempData = []
        Object.keys(res.val()).reverse().forEach(keys => {
            tempData = [...tempData, res.val()[keys]
        ]
        })
        setListData(tempData)
}

    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title} >Feed</Text>
        <FlatList
        refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={async () => {
                setLoading(true);
                await fetchFeed();
                setLoading(false);
            }}>

            </RefreshControl>
        }
            data={listData}
            renderItem={({ item }) => 
            <View style={styles.postBorder}>
                <View style={{ flexDirection: "row", alignItems: "center"}}>
                    <View>
                        <Text style={styles.postName}>
                            Namn
                        </Text>
                        <Text style={styles.postDate}>
                            {new Date(item.createdOn).toString().substring(0, 16)}
                        </Text>
                    </View>

                </View>
                <Text style={styles.postText}>
                    {item.text}
                </Text>

                <View style={styles.likeCommentBox}>
                    <TouchableOpacity style={styles.likeBox}>
                        <Text style= {styles.likeCommentText}>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentBox}
                        title="Comment"
                        onPress = {() => 
                        Alert.prompt("Comment", "Comment on a Post", comment => console.log(comment))}>
                        <Text style={styles.likeCommentText}>Comment</Text>
                    </TouchableOpacity>
                </View>


            </View>}>

            keyExtractor={(item) => (item.createdOn + "")}
            
        </FlatList>

        <TouchableOpacity style={styles.createFeedButton} onPress={() => onCreateFeedPressed()}>
            <Text>
                Create post
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
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    commentBox: {
        flex: 1,
        margin: 10
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
        fontSize: 20
    },
    postText: {
        fontSize: 12,
        marginTop: 5
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
        backgroundColor: 'green',
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
      },
    })