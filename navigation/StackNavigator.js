import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import  { useState } from "react";


import SearchScreen from "../screen/TabOne/SearchScreen";
import ResultsScreen from "../screen/TabOne/ResultsScreen";
import IngResultScreen from "../screen/TabOne/IngResultScreen";
import RecipeScreen from "../screen/TabOne/RecipeScreen";
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
      <TabOneStack.Screen
        name="IngResultScreen"
        component={IngResultScreen}
        options={navOptionHandler}
      />
      <TabOneStack.Screen
        name="RecipeScreen"
        component={RecipeScreen}
        options={navOptionHandler}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

export function TabTwoNavigator() {
  const [etcCheck, setetcCheck] = useState( [
    {
      id:0,
      content: "할랄",
      checked: false,
    },
    {
      id:1,
      content: "비건",
      checked: false,
    },
  ]);
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={SettingScreen}
        options={navOptionHandler}
        initialParams ={{etcCheck:etcCheck, setetcCheck : setetcCheck}}

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