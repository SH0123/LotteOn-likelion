import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';


Font.loadAsync({
  'Medium': require('../../assets/fonts/GothicA1-Medium.ttf'),
});


export default function Checklist({id, checklist, onToggle, font}) {
    return (
        <TouchableOpacity  style={styles.row} onPressOut={onToggle(id)}>
            {checklist.checked ?(
            <MaterialCommunityIcons size={22} name='checkbox-marked-circle-outline' />
            ):(
            <MaterialCommunityIcons size={22} name='checkbox-blank-circle-outline' />
            )}
            <Text style={styles.listContent}> {checklist.content}</Text>
      </TouchableOpacity>
    );  
}

const styles = StyleSheet.create({
    row:{
      flexDirection: "row" , 
      margin:3,
    }, 
     listContent:{
      color:"black",
      fontSize:15,
    fontFamily:'Medium',
    marginTop:2,
    },

  });
  