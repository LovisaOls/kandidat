import { View,  ScrollView , ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, Text, Modal } from 'react-native';
import React from "react";




  const OPTIONS = ['blue', 'red']

  const ModalPicker = (props) => {
      
    const onPressItem = (option) => {
      props.changeModalVisibility(false);
      props.setData(option)

    }

    const option = OPTIONS.map((item, index) => {
      return (
        <TouchableOpacity
        key= {index}
        onPress={() => onPressItem(item)}
        >
          <Text>
            {item}
          </Text>
        </TouchableOpacity>
      )
    })

    return(
        <TouchableOpacity

        onPress={() => props.changeModalVisibility(false)}
      >
          <View>
        <ScrollView>
            {option}
        </ScrollView>
        </View>
      </TouchableOpacity>

    )


  }
  export {ModalPicker}