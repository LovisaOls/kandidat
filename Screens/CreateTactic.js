import React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';




export default function CreateTactic() {
  
 
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/footballfield.png')}
          style={{
            width: null,
            height: null,
            flex: 1,
          }}>
          <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.45)', flex: 1 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(204, 70, 43, 0)',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      marginLeft: 10,
                    },
                  ]}>
                  {"Barcelona"}
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      position: 'absolute',
                      right: 20,
                    },
                  ]}>
                  {"3-5-2"}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
  },
  rowHome: {
    flex: 1,
    flexDirection: 'row',
  },
  rowAway: {
    flex: 1,
    flexDirection: 'row',
  },
  el: {
    flexGrow: 1,
    alignItems: 'center',
  },
  playHome: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgb(244, 67, 54)',
    backgroundColor: 'rgba(244, 67, 54,0.5)',
  },
  playAway: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgb(3, 169, 244)',
    backgroundColor: 'rgba(3, 169, 244,0.5)',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    fontSize: 15,
    marginTop: 40
  },
});