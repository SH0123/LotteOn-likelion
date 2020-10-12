import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import SearchScreen from "../screen/TabOne/SearchScreen";
import SettingScreen from "../screen/TabTwo/SettingScreen";

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
