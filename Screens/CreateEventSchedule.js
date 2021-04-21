import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {Text, TextInput, TouchableOpacity, View, SafeAreaView,} from 'react-native';

 
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export default function CreateEventSchedule({navigation}) {
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [place, setPlace] = useState('')
    const [description, setDescription] = useState('')

    const onCreatePress = () => {


        firebase.database().ref('/events/').push()
                    .set({
                        title: title,
                        type: type,
                        date: date,
                        time: time,
                        place: place,
                        description: description,
                    })
                    .then(() => {
                        this.props.navigation.navigate('TestSchedule')
                    })
                    .catch((error) => {
                        alert(error)
                    });

        
    } 

    return (

            
        <View style={styles.container}>
                <SafeAreaView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style = {styles.title} >Create Event</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Title'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Type'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setType(text)}
                    value={type}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Date'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDate(text)}
                    value={date}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Time'
                    onChangeText={(text) => setTime(text)}
                    value={time}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Place'
                    onChangeText={(text) => setPlace(text)}
                    value={place}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Description'
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onCreatePress()}>
                    <Text style={styles.buttonTitle}> Create </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('TestSchedule')}> 
                    <Text style = {styles.cancelText}> Cancel </Text>
                </TouchableOpacity>


            </SafeAreaView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        textAlign: 'center'
    },

    title: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 24,
    },
    input: {
        fontSize: 16,
        height: 48,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        borderWidth: 0.25
    },
    button: {
        backgroundColor: 'green',
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTitle:{
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },

    cancelText: {
        fontSize: 16,
        color: 'blue',
        margin: 10,
        alignContent:'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
})