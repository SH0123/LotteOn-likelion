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
    <BottomTab.Navigator initialRouteName="검색" 
    tabBarOptions={{
      showLabel: false,
      activeTintColor: 'white', // 탭 활성
      inactiveTintColor: '#A23E3A', // 탭 비활성
      style:{
        backgroundColor:"#F06B6B"
      }
    }}>
      <BottomTab.Screen
        name="검색"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-search" color={color} size={28} />
          )
        }}
      />
      <BottomTab.Screen
        name="설정"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person" color={color} size={28} />
          )
        }}
      />
     <BottomTab.Screen
        name="즐겨찾기"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-star" color={color} size={28} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}