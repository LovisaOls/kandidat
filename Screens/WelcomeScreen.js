
import React from 'react';
import { Image, StyleSheet } from 'react-native';


function WelcomeScreen(props) {

    return (
        <Image 
        source={require('../assets/Logga.png')}
        style={styles.logga}
        ></Image>
    );
}
const styles = StyleSheet.create({

logga:{
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    },
})

export default WelcomeScreen;