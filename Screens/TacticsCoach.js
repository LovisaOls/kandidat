
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import BottomMenu from "../Screens/BottomMenu";
import TopMenu from "../Screens/TopMenu";

export default function TacticsCoach() {


    return (
        <View style={styles.container}>

            <TopMenu />

            <View style={styles.Tactic}>
                <Text style={styles.TacticText}> My Tactics </Text>
                <TouchableOpacity style={styles.addTacticBtn}>
                    <Text style={styles.addTactic}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.TacticBoarder}>
                <TouchableOpacity>
                <Image style={styles.TacticImage} source={require("../assets/TacticBoard.png")} />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomMenu}>
                <BottomMenu />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10,
    },
/* ------------------------------------------ */
    Tactic: {
        flexDirection: "row",
        marginTop: 10,
    },

    TacticText: {
        fontSize: 30,
    },

    addTacticBtn: {
        width: "15%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        marginLeft: 40,
    },

/* ------------------------------------------ */

    TacticBoarder: {
        marginTop: 20,
    },

    TacticImage: {
        height: 440,
        width: 350,
    },

    /* ------------------------------------------ */

    bottomMenu: {
        position: "absolute",
        bottom: 0,
        justifyContent: "space-between",
        width: "100%",
    },
});