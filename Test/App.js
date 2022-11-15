import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import KakaoLogin from './login/KakaoLogin';
import Join from './login/Join';

function HomeScreen() {
  return (
    <View >
      <Text>Home!</Text>
      <Join/>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KakaoLogin/>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  const Stack = createStackNavigator();
  

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="카카오톡" component={HomeScreen}/>
        <Tab.Screen name="추가 정보" component={SettingsScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
