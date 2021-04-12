import React from "react";
import {Image, StyleSheet, View} from "react-native";

function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.profileIcon}></View>
            <Image style={styles.teamLogo}></Image>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    teamLogo: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    profileIcon: {
        width: 50,
        height: 50,
        backgroundColor: "blue",
        position: "absolute",
        top: 40,
        left: 30,
    }
})

export default HomeScreen;