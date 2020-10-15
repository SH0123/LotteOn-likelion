import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import SearchScreen from "../screen/TabOne/SearchScreen";
import ResultsScreen from "../screen/TabOne/ResultsScreen";
import SettingScreen from "../screen/TabTwo/SettingScreen";
import FavoritesScreen from "../screen/TabThree/FavoritesScreen";

const navOptionHandler = () => ({
    headerShown: false
  });  

const TabOneStack = createStackNavigator();

export function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={SearchScreen}
        options={navOptionHandler}
      />
      <TabOneStack.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        options={navOptionHandler}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

export function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={SettingScreen}
        options={navOptionHandler}
      />
    </TabTwoStack.Navigator>
    
  );
}

const TabThreeStack = createStackNavigator();

export function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={FavoritesScreen}
        options={navOptionHandler}
      />
    </TabThreeStack.Navigator>
  );
}