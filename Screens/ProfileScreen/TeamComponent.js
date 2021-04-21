
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const TeamComponent  = ({team}) =>{
    return(
        <TouchableOpacity>
            <Text style={styles.addedTeamsText}>
                {team.teamId}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

});

export default TeamComponent;