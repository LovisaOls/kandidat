import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import React, {useEffect} from 'react';
import { Image, StyleSheet, View} from 'react-native';
import {useDispatch } from 'react-redux';

import { Actions } from 'react-native-router-flux'; 
import {setCurrentUser} from '../actions/index'

function LoadingScreen(){
    const dispatch = useDispatch();
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
                console.log('user is already signed in')
                dispatch(setCurrentUser(user.uid))
            } else {
              // No user is signed in.
              console.log('no user --> sign in')
              Actions.welcome();
            }
        });
    });

        return (
            <View style={styles.theLogo}>
                <Image style = {styles.image}
                source={require('../assets/Logga.png')}
                />          
            </View>
            
        );
        
}

const styles = StyleSheet.create({
    image: {
        marginBottom: 40,
        height: 150,
        width: 150,
        alignItems: "center",
        justifyContent: 'center'
      },
    theLogo: {
        alignItems: "center",
        marginTop: 100,
      },
});

  
export default LoadingScreen;
  