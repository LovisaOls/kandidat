import { StyleSheet } from 'react-native';
import React, { useState } from 'react'
import {Text, TextInput, TouchableOpacity, View, SafeAreaView, TouchableHighlight } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker'

 
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export default function RegistrationScreen({navigation}) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords are not the same")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
        firebase.database().ref('/users/' + response.user.uid)
                    .set({
                        id: response.user.uid,
                        email: email,
                        firstName: firstName,
                        lastName: lastName})
                    .then(() => {
                        navigation.navigate('Welcome'
                   /*      {user: {
                            id: response.user.uid,
                            email: email,
                            firstName: firstName,
                            lastName: lastName}}) */
                        )
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });
    } 

    const onCancelPress = () => {
        console.log('GO BACK!!');
    }

    return (
        <View style={styles.container}>
                <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style = {styles.title} >Create Account</Text>

                <TextInput
                    style={styles.input}
                    placeholder='First Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Last Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}> Register </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => onCancelPress()}> 
                    <Text style = {styles.cancelText}> Cancel </Text>
                </TouchableOpacity>

            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
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