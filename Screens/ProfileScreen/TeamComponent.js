
import React, { useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from "react-native";
import { shouldUseActivityState } from 'react-native-screens';
import {useDispatch, useSelector} from 'react-redux';

const TeamComponent  = ({team}) =>{
    const dispatch = useDispatch();
    const onTeamPressed = () =>{
        dispatch(setCurrentTeam(team.teamId))
    }
    return(
        <View  style={styles.teamBox}>
            <TouchableOpacity onPress ={ () => onTeamPressed()}>
                <Text style={styles.teamsText}>
                    {team.teamName}
                </Text>
            </TouchableOpacity>
        </View>
        

    )
}

const styles = StyleSheet.create({
    teamsText: {
        fontSize: 20,
        padding: 10,
    },
    teamBox: {
        borderRadius: 10,
        borderColor: "green",
        borderWidth: 0.25,
        margin: 1,
        flexDirection:'row'
    },

});

export default TeamComponent;