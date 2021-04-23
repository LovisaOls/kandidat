import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {Text, TextInput, TouchableOpacity, View, SafeAreaView, TouchableHighlight } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { registerUser } from '../actions';
import { useDispatch} from 'react-redux';


export default function RegistrationScreen() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const dispatch = useDispatch();

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords are not the same")
            return
        }
        dispatch(registerUser(email, password, firstName, lastName));
    } 
    const onCancelPress = () => {
        Actions.Welcome()
    }

    return (
        <View style={styles.container}>
                <SafeAreaView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style = {styles.title} >Create Account</Text>

                <TextInput
                    style={styles.input}
                    placeholder='First Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Last Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email Address'
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