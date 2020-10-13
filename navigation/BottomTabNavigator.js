import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as React from "react";

import {
    TabOneNavigator,
    TabTwoNavigator,
    TabThreeNavigator
  } from "./StackNavigator";

  const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="검색">
      <BottomTab.Screen
        name="검색"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-search" color={color} size={23} />
          )
        }}
      />
      <BottomTab.Screen
        name="설정"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person" color={color} size={23} />
          )
        }}
      />
     <BottomTab.Screen
        name="즐겨찾기"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person" color={color} size={23} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}