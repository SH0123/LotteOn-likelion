

import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useState } from 'react';

export default function FavoritesScreen() {


  return (

    <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <Text  style={styles.title}>즐겨찾기</Text>
        </View>

        <View style={styles.recipe}>
          <Text style={styles.subtitle}>레시피</Text>

          <View style={styles.cols}>

            <View style={styles.row}>
              <View style={styles.content}>
                  <View style ={styles.box}/>
                  <Text>두부조림</Text>
              </View>
              
              <View style={styles.content}>
                  <View style ={styles.box}/>
                  <Text>두부조림</Text>
              </View>
            </View>
            
            <View style={styles.row}>
              <View style={styles.content}>
                  <View style ={styles.box}/>
                  <Text>두부조림</Text>
              </View>
              
              <View style={styles.content}>
                  <View style ={styles.box}/>
                  <Text>두부조림</Text>
              </View>
            </View>

          </View>

        </View>
        <View style={styles.item}> 
          <Text style={styles.subtitle}>제품</Text>
        </View>
    </SafeAreaView>

  );
};



const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,  
  },

  subtitle: {
    fontSize: 20,  
  }, 

   content: {
    width: "47%",  
    height:"50%",
    backgroundColor:"grey",
    padding:5,
    margin:5
  },
  box: {
    width: "100%",  
    height:"85%",
    backgroundColor:"black",
  },


  recipe: {
    flex: 1,
    backgroundColor:"lightgrey",
  },
  item: {
    flex: 1,
  },

  row: {
    flexDirection:"row"
  },
  cols: {
    flexDirection:"column"
  },
});