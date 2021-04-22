
import React, { useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import fetchTeam from '../../actions/index';

const TeamComponent  = ({teamId}) =>{
    const dispatch = useDispatch();
    const onTeamPressed = () =>{
        //dispatch(setCurrentTeam(teamId))
    }
    return(
        <TouchableOpacity onPress ={ () => onTeamPressed()}>
            <Text style={styles.addedTeamsText}>
                {teamId}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addedTeamsText: {
        fontSize: 20,
        padding: 10,
    },
});

export default TeamComponent;