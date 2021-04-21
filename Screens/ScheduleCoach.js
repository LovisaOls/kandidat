
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import BottomMenu from "../Screens/BottomMenu";
import TopMenu from "../Screens/TopMenu";

export default function ScheduleCoach() {


    return (
        <View style={styles.container}>

            <TopMenu />

            <View style={styles.ScheduleTopic}>
                <Text style={styles.ScheduleTopicText}> Schedule </Text>
            </View>

            <View style={styles.TheSchedule}>
                <CalendarList
                    // Enable horizontal scrolling, default = false
                    horizontal={true}
                    // Set custom calendarWidth.
                    calendarWidth={320}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={12}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={12}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Initially visible month. Default = Date()
                    current={Date()}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => { console.log('selected day', day) }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => { console.log('selected day', day) }}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={true}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    disableAllTouchEventsForDisabledDays={true}
                />
            </View>

            <View style={styles.ChoosenDay}>
                <TouchableOpacity>
                    <Text style={styles.todayText}>
                        Here will the the info about the choosen day on schedule show.
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