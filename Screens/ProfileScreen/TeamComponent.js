import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
<<<<<<< HEAD
import {setActiveTeam} from '../../actions/index'

const TeamComponent  = ({team}) =>{
    const dispatch = useDispatch();
    
    const onTeamPressed = () =>{
        console.log('teamPressed:',team)
        console.log('teamId', team.teamId)
        dispatch(setActiveTeam(team.teamId))
    }
    return(
        <View  style={styles.teamBox} >
            <TouchableOpacity style={styles.teamBox} onPress ={ () => onTeamPressed()}>
                <Text style={styles.teamsText}>
                    {team.teamName}
                </Text>
                <Icon style={styles.teamsText} name="chevron-forward-outline"></Icon>
            </TouchableOpacity>
        </View>
        
=======
import { setActiveTeam } from "../../actions/index";
>>>>>>> main

const TeamComponent = ({ team }) => {
  const dispatch = useDispatch();
  const onTeamPressed = () => {
    console.log("teamPressed:", team);
    console.log("teamId", team.teamId);
    dispatch(setActiveTeam(team.teamId));
  };
  return (
    <View style={styles.teamBox}>
      <TouchableOpacity style={styles.teamBox} onPress={() => onTeamPressed()}>
        <Text style={styles.teamsText}>{team.teamName}</Text>
        <Icon style={styles.teamsText} name="chevron-forward-outline"></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  teamsText: {
    fontSize: 20,
    padding: 15,
  },

  teamBox: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    margin: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TeamComponent;
