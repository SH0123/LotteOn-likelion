import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
 

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <Text  style={styles.title}>즐겨찾기</Text>
        </View>

        <View style={styles.recipe}>
          <Text style={styles.subtitle}>레시피</Text>
        </View>
        <View style={styles.item}> 
          <Text style={styles.subtitle}>제품</Text>
        </View>
    </SafeAreaView>
  );
}

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
  recipe: {
    flex: 1,
    backgroundColor:"grey",
  },

  item: {
    flex: 1,
  },
});