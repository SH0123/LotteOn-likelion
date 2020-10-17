import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function TodoItem({key,allergy, setallergy}) {
    console.log(key)
    return (
        <TouchableOpacity  style={styles.row} key = {key} onPressOut={()=>setallergy(key)}>
            {allergy.check ?(
            <MaterialCommunityIcons size={22} name='checkbox-marked-circle-outline' />
            ):(
            <MaterialCommunityIcons size={22} name='checkbox-blank-circle-outline' />
            )}
            <Text style={styles.listContent}> {allergy.content}</Text>
      </TouchableOpacity>
    );  
}
const styles = StyleSheet.create({
    row:{
      flexDirection: "row" , 
    }, 
     listContent:{
      color:"black",
      fontSize:15,
      marginTop:2
    },

  });
  