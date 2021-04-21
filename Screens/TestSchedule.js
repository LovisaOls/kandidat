import React, { Component, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import BottomMenu from './BottomMenu';
import TopMenu from './TopMenu';


import firebase from "firebase/app";


export default class TestSchedule extends Component {


    constructor(props) {
        super(props);
        this.state = {
            items: {}

        };
    }

    render() {

        return (

            <SafeAreaView style={styles.container}>


                <View>
                    <TopMenu />
                </View>
                <Text></Text>
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("CreateEventSchedule")}>
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
                        '2021-04-20': [{ name: "Press to see events " }],
                        '2021-04-21': [],
                        '2021-04-22': [{ name: "Press to see events " }]
                    }}
                    events={'2021-04-19'}
                    selected={Date()}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                />

                <View>
                    <BottomMenu />
                </View>
            </SafeAreaView>
        );
    }

    //funktion för att skapa ett event//


    //the cards for events//
    renderItem(item) {
        return (
            <TouchableOpacity
                style={[styles.item, { height: item.height }]}
                onPress={() => Alert.alert("Your events this day is: ")}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>This is no events this day</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }
}

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
