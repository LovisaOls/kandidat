
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import BottomMenu from "../Screens/BottomMenu";
import TopMenu from "../Screens/TopMenu";

export default function CoachHome() {


    return (
        <View style={styles.container}>

            <TopMenu/>

            <View style={styles.TeamInfo}>
                <Image style={styles.image} source={require("../assets/TestTeamLogga.png")} />
                <Text style={styles.name} > Team ID: </Text>
                <Text style={styles.name} > City: </Text>
            </View>


            <SafeAreaView style={styles.MyMemberRequests}>
                <Text style={styles.TheRequests}> Membership Requests </Text>
            <View style={styles.TheBtns}>
                <Text  style={styles.RequestsName} >Dolle</Text>
                <TouchableOpacity style={styles.AcceptBtn}>
                    <Text style={styles.Accept}> ✓ </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.DeclineBtn}>
                    <Text style={styles.Decline}> X </Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>


            <View style={styles.GameStats}>
                <TouchableOpacity>
                    <Text style={styles.StatsText}>
                        GameStatistics
                    </Text>
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
/* ____________________________________________ */

    TeamInfo: {
        marginTop: 30,
        flexDirection: "row",
    },

    image: {
        marginBottom: 50,
        height: 100,
        width: 100,
    },
    name: {
        fontSize: 20,
        textAlign: "center",
    },

    /* _____________________________________________ */

    MyMemberRequests: {
        borderStyle: "dashed",
        borderRadius: 1,
        borderColor: "green",
        borderWidth: 1,
        padding: 10,
    },

    TheRequests: {
        fontSize: 20,
    },
    RequestsName: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
    },

    TheBtns: {
        flexDirection: "row",
    },

    AcceptBtn: {
        width: "10%",
        borderRadius: 25,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        marginLeft: 10,
        marginTop: 10,
    },
    DeclineBtn: {
        width: "10%",
        borderRadius: 25,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        marginLeft: 10,
        marginTop: 10,
    },

/* --------------------------------------------- */

    GameStats: {
        marginTop: 50,
        borderStyle: "dashed",
        borderRadius: 1,
        borderColor: "green",
        borderWidth: 1,
    },

    StatsText: {
        fontSize: 20,
        padding: 10,
    },

/* --------------------------------------------- */

    bottomMenu: {
        position: "absolute",
        bottom: 0,
        justifyContent: "space-between",
        width: "100%",
    },


});