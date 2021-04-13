import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function TopMenu() {

  return (
    <View style={styles.container}>

      <View style={styles.top}>
      <TouchableOpacity>
      <Image style={styles.topImage} source={require("../assets/MyProfile.png")} />
      </TouchableOpacity>
      <TouchableOpacity>
      <Image style={styles.topImage} source={require("../assets/Settings.png")} />
      </TouchableOpacity>
      </View>
      </View>

      );
      }

      const styles = StyleSheet.create({
        top: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
            margin:10,
          },
        
        topImage: {
          height: 40,
          width:40,
        },
      });
