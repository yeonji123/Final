import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import KakaoLogin from './login/KakaoLogin';

import Join from './login/Join';
import MyPage from './MyPage/MyPage';
import AnimalDetail from './MyPage/AnimalDetail';
import ModifyAnimal from './MyPage/ModifyAnimal';
import AnimalList from './MyPage/AnimalList';
import MypageModify from './MyPage/MyPageModify';
import AddAnimal from './MyPage/AddAnimal';

const Stack = createStackNavigator();

function Home({ navigation }) {
  return (

    <ScrollView>
      <Text>Join</Text>
      <Button title="회원가입 페이지로 이동"
        onPress={() => {
          navigation.navigate('Join')
        }}
      />
      <Text>Mypage</Text>
      <Button title="마이페이지로 이동"
        onPress={() => {
          navigation.navigate('MyPage');
        }}
      />
      <Text>MypageModify</Text>
      <Button title="마이페이지 수정으로 이동"
        onPress={() => {
          navigation.navigate('MypageModify');
        }}
      />
      <Text>AnimalDetail</Text>
      <Button title="애완동물 정보 페이지로 이동"
        onPress={() => {
          navigation.navigate('AnimalDetail');
        }}
      />
      <Text>AnimalList</Text>
      <Button title="애완동물 목록 페이지로 이동"
        onPress={() => {
          navigation.navigate('AnimalList');
        }}
      />
      <Text>ModifyAnimal</Text>
      <Button title="애완동물 정보 수정 페이지로 이동"
        onPress={() => {
          navigation.navigate('ModifyAnimal');
        }}
      />
      <Text>AddAnimal</Text>
      <Button title="애완동물 추가 페이지"
        onPress={() => {
          navigation.navigate('AddAnimal');
        }}
      />
    </ScrollView>
  )

}


// const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Join" component={Join} />
        <Stack.Screen name="Kakao" component={KakaoLogin} />
        {/* <Stack.Screen name="Map" component={GoogleMap} /> */}
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="MypageModify" component={MypageModify} />
        <Stack.Screen name="AnimalDetail" component={AnimalDetail} />
        <Stack.Screen name="AnimalList" component={AnimalList} />
        <Stack.Screen name="ModifyAnimal" component={ModifyAnimal} />
        <Stack.Screen name="AddAnimal" component={AddAnimal} />
      </Stack.Navigator>


      {/* <Tab.Navigator>
        <Tab.Screen name="카카오톡" component={HomeScreen} />
        <Tab.Screen name="추가 정보" component={SettingsScreen} />
        <Tab.Screen name="마이페이지" component={MyPageScreen} />
      </Tab.Navigator> */}
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
