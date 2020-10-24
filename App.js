import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";


if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;


export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

