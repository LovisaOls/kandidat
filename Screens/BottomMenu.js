import React from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from "react-native";

export default function BottomMenu() {

    return (
        <View style={styles.container}>


            <View style={styles.bottom}>
                <TouchableOpacity >
                    <Image style={styles.bottomImage} source={require("../assets/Home.png")} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image style={styles.bottomImage} source={require("../assets/Feed.png")} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image style={styles.bottomImage} source={require("../assets/Schedule.png")} />
                </TouchableOpacity> 
      <TouchableOpacity>
                    <Image style={styles.bottomImage} source={require("../assets/Tactic.png")} />
                </TouchableOpacity> 
            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopColor: "black",
        borderTopWidth: 3,

    },

    bottomImage: {
        height: 50,
        width: 50,
    },
});
