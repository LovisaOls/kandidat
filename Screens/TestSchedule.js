import React, { Component, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import TopMenu from './TopMenu';

import { Actions } from 'react-native-router-flux';

import firebase from "firebase/app";
import CreateEventSchedule from './CreateEventSchedule';

export default function TestSchedule() {



    /* function CreateEvent() {

        const date = [];
        const title = [];
        {
            Object.keys(this.state.event).map((eventId, i) => (
                date.push(this.state.event[eventId].date),
                title.push(this.state.event[eventId].title)
            ))
        }
        console.log(date, title)
    } */

    function renderItem(item) {
        return (
            <TouchableOpacity
                style={[styles.item, { height: item.height }]}
                onPress={() => Alert.alert("Your events this day is: ")}
            >
            

            </TouchableOpacity>
        );
    }

    function rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    return (

        <SafeAreaView style={styles.container}>


            <View>
                <TopMenu />
            </View>

        

            <View>
                <TouchableOpacity onPress={() => Actions.CreateEventSchedule()}>
                    <Text>Create Event</Text>
                </TouchableOpacity>
            </View>
            <Agenda

                theme={{
                    'stylesheet.agenda.main': {
                        weekdays: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: 0,
                            marginLeft: 15,
                            marginRight: 15,
                            paddingTop: 15,
                            paddingBottom: 7,
                            backgroundColor: 'green',
                        },
                    },
                }}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={12}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={12}
                items={{
                    '2021-04-26': [],
                    '2021-04-27': [{ name: "Press to see events " }],
                    '2021-05-03': [{ name: "Press to see events " }]
                }}
                selected={Date()}
                renderItem={renderItem()}
                renderEmptyDate={renderEmptyDate()}
                rowHasChanged={rowHasChanged()}
            />

        </SafeAreaView>
    );
}



//funktion för att skapa ett event//



//the cards for events//





const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white"
    },

    item: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    }
});
