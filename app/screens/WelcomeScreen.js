import React from "react";
import { ImageBackground, StyleSheet, View, Image } from "react-native";

function WelcomeScreen (props) {
    return (
        <ImageBackground
            style={styles.background}
            source={require("../assets/background.png")}
        >
            <Image styles={styles.logo} source={require("../assets/logo.png")}></Image>
            <View style={styles.loginButton}></View>
            <View style={styles.passwordButton}></View>


        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: "grey"
    },
    passwordButton: {
        width: "100%",
        height: 70,
        backgroundColor: "blue"
    },
    logo: {
        position: "absolute",
        top: 70,
    }
})

export default WelcomeScreen;