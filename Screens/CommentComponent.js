
import React, { useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from "react-native-vector-icons/Ionicons";
import {setActivePost} from '../actions/index';

const CommentComponent  = ({post}) =>{
    const dispatch = useDispatch();
    
    const onPostPressed = () =>{
        console.log('postPressed',post)
        console.log('teamId', post.postId)
        dispatch(setActivePost(post.postId))
    }
    return(
        <View  style={styles.teamBox} >
            <TouchableOpacity style={styles.teamBox} onPress ={ () => onPostPressed()}>
                <Text style={styles.teamsText}>
                    hej
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    teamsText: {
        fontSize: 20,
        padding: 15,
    },

    teamBox: {
        width: '100%',
        borderRadius: 10,
        backgroundColor:'#D3D3D3',
        margin: 1,
        flexDirection:'row',
        justifyContent: 'space-between'
    }

});

export default CommentComponent;