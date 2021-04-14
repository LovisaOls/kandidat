import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import firebase from "firebase/app";
import "firebase/database";

export default function TeamRegistration({navigation}) {
    const [teamName, setTeamName] = useState('')
    const [city, setCity] = useState('')

    const addTeamButtonPressed = () => {
        console.log("Team added with teamID")
        firebase.database().ref('/teams/').push().
            set({
                teamName: teamName,
                city: city})
            .then(() => {
                navigation.navigate('Profile', {team:{
                    teamName: teamName,
                    city: city}})
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
                <Text style = {styles.title} >Add A New Team</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Team name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setTeamName(text)}
                    value={teamName}
                    autoCapitalize="none"
                ></TextInput>

                <TextInput
                    style={styles.input}
                    placeholder='City'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setCity(text)}
                    value={city}
                    autoCapitalize="none"
                ></TextInput>

                <TouchableOpacity style={styles.addTeamButton} onPress={() => addTeamButtonPressed()}>
                    <Text>
                        Add team
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
    }

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
    },
    title: {
        fontSize: 24,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10,
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
    addTeamButton: {
        backgroundColor: 'green',
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

