import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import React, {useEffect} from 'react';
import { Image, StyleSheet, View, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';

import { Actions } from 'react-native-router-flux'; 
import {setCurrentUser, fetchUserTeams} from '../actions/index'

function LoadingScreen(){
    const dispatch = useDispatch();
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
                console.log('user is already signed in')
                //Väntar 2 sekunder
                setTimeout(() => {
                  dispatch(setCurrentUser(user.uid))
                  
                }, 2000);
              
            } else {
              // No user is signed in.
              console.log('no user --> sign in')
              //Väntar 2 sekunder
              setTimeout(() => {
                Actions.Welcome();
              }, 2000);
            }
        })
    });

        return (
            <View style={styles.theLogo}>
                <Image style = {styles.image}
                source={require('../assets/Logga.png')}
                />          
            </View>
            
        );
        
}
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        justifyContent: 'center',

      },
    theLogo: {
        height: screenHeight,
        width: screenWidth,
        backgroundColor:'white',
        alignItems: "center",
        padding: 10,
        margin:10
      },
});

  
export default LoadingScreen;
  