
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

export default function ScheduleCoach() {


    return (
        <View style={styles.container}>

            <TopMenu />

            <View style={styles.UpcomingEventsTopic}>
                <Text style={styles.EventTopicText}> Upcoming Events </Text>
            </View>

            <View style={styles.UpcomingEvents}>
                <TouchableOpacity>
                    <Text style={styles.EventsText}>
                        Next training is tomorrow
                    </Text>

                </TouchableOpacity>
            </View>

            <View style={styles.ScheduleTopic}>
                <Text style={styles.ScheduleTopicText}> Schedule </Text>
            </View>

            <View style={styles.TheSchedule}>
                <TouchableOpacity>
                    <Text style={styles.EventsText}>
                        Here will the Schedule place
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.ChoosenDay}>
                <TouchableOpacity>
                    <Text style={styles.todayText}>
                        Here will the the info about the choosen day on schedule show.
                        It will not be avail if they hav'nt picked any day
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
/* ------------------------------------------ */
    UpcomingEventsTopic: {
        marginTop: 10,
    },

    EventTopicText: {
        fontSize: 30,
    },

/* ------------------------------------------ */

    UpcomingEvents: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 30,
        borderStyle: "dashed",
        borderRadius: 1,
        borderColor: "green",
        borderWidth: 1,
    },

    EventsText: {
        fontSize: 20,
        padding: 10,
    },

    /* ------------------------------------------ */

    ScheduleTopic: {
        marginTop: 10,
    },

    ScheduleTopicText: {
        fontSize: 30,
    },

    /* ------------------------------------------ */


    TheSchedule: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 30,
        borderStyle: "dashed",
        borderRadius: 1,
        borderColor: "green",
        borderWidth: 1,
    },

    EventsText: {
        fontSize: 20,
        padding: 10,
    },
        /* ------------------------------------------ */


        ChoosenDay: {
            marginTop: 10,
            marginLeft: 10,
            marginRight: 30,
            borderStyle: "dashed",
            borderRadius: 1,
            borderColor: "green",
            borderWidth: 1,
        },
    
        todayText: {
            fontSize: 20,
            padding: 10,
        },
    

    /* ------------------------------------------ */

    bottomMenu: {
        position: "absolute",
        bottom: 0,
        justifyContent: "space-between",
        width: "100%",
    },
});