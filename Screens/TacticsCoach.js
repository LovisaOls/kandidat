import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';








export default function CreateTactic() {

  return (

    <View style={styles.containers}>

      <View style={styles.Tactic}>
        <Text style={styles.TacticText}> My Tactics </Text>
        <TouchableOpacity style={styles.addTacticBtn}>
          <Text style={styles.addTactic}>+</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.container}>
        <ImageBackground source={require("../assets/footballfield.png")}
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            marginTop: 40,
            marginBottom: 40,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={[
              styles.text,
              {
                marginLeft: 20,
              },
            ]}>
            {"hejhej"}
          </Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  
  containers: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "white"
  },
  
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "white"
  },

  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    fontSize: 15,
  },


  Tactic: {
    flexDirection: "row",
    marginTop: 10,
  },

  TacticText: {
    fontSize: 30,
  },

  addTacticBtn: {
    width: "15%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    marginLeft: 40,
  },
});