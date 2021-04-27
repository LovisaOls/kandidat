import React, { useEffect,useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import TopMenu from './TopMenu';
import { useDispatch, useSelector } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { fetchEvents } from "../actions/index";


export default function TestSchedule() {


    const { activeTeam } = useSelector((state) => state.currentTeams);
    const dispatch = useDispatch();
    useEffect(() => {
        //fetchFeed();
        dispatch(fetchEvents(activeTeam.teamId));
    }, [dispatch]);

    const events = useSelector((state) => state.scheduleEvents);
    console.log("hej tova", events)


    /*  renderItem(item) {
        
          <TouchableOpacity
            style={[styles.item, {height: item.height}]}
            onPress={() => Alert.alert(item.name)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        
      } */

    /*    function rowHasChanged(r1, r2) {
           return r1.name !== r2.name;
       } */
       const structureEvents = [];

       function CreateEvent() {
        {Object.keys(events).map((eventId) => {
                structureEvents.push(events[eventId].date)
                structureEvents[events[eventId].date] = {bajs: ""}
            }     
        )}
        console.log("her kmr strukture",structureEvents)
        }

        const renderItem = () => (
            <TouchableOpacity
              style={[styles.hej]}
              onPress={() => Alert.alert("hejhej")}
            >
              <Text>{events[eventId].title}</Text>
            </TouchableOpacity>
          );

      CreateEvent();
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
                data={events && Object.keys(events)} 
                /* items={structureEvents} */
                items= {structureEvents}
           /*      renderItem={({ eventId }) => (

                    <TouchableOpacity
                    onPress={() => Alert.alert("hejhej")}
                  >
                    <Text>{events[eventId].title}</Text>

                  </TouchableOpacity>
                
                )} */
                    
                selected={Date()}
                firstDay={1}

            /* rowHasChanged={rowHasChanged()} */
            />

        </SafeAreaView>
    );
}



const styles = StyleSheet.create({

    hej:{
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },

    container: {
        flex: 1,
        backgroundColor: "white"
    },

    
    emptyDate: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    }
});
