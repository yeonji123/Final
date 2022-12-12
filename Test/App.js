import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Join from './login/Join';
import MyPage from './MyPage/MyPage';
import AnimalDetail from './MyPage/AnimalDetail';
import AnimalList from './MyPage/AnimalList';
import MypageModify from './MyPage/MyPageModify';
import AddAnimal from './MyPage/AddAnimal';
import AddFood from './MyPage/AddFood';
import Food from './MyPage/Food';
import Play from './MyPage/Play';
import MyPoint from './MyPage/MyPoint';
import MapDesign from './Components/MapDesign'
import KakaoLogin from './login/KakaoLogin';

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
      <Text>AddAnimal</Text>
      <Button title="애완동물 추가 페이지"
        onPress={() => {
          navigation.navigate('AddAnimal');
        }}
      />
      <Text>AddFood</Text>
      <Button title="밥 추가 페이지"
        onPress={() => {
          navigation.navigate('AddFood');
        }}
      />
      <Example></Example>
      <Text>Food</Text>
      <Button title="밥 체크 페이지"
        onPress={() => {
          navigation.navigate('Food');
        }}
      />
      <Text>Play</Text>
      <Button title="놀기 페이지"
        onPress={() => {
          navigation.navigate('Play');
        }}
      />
      <Text>point</Text>
      <Button title="pont 페이지"
        onPress={() => {
          navigation.navigate('MyPoint');
        }}
      />
      <Text>MapDesign</Text>
      <Button title="MapDesign 페이지"
        onPress={() => {
          navigation.navigate('MapDesign');
        }}
      />
      <Text>KakaoLogin</Text>
      <Button title="KakaoLogin 페이지"
        onPress={() => {
          navigation.navigate('KakaoLogin');
        }}
      />
    </ScrollView>
  )
}
import StarRating from 'react-native-star-rating-widget';
//expo install react-native-svg
//npm i react-native-star-rating-widget



const Example = () => {
  const [rating, setRating] = useState(0);

  return (
    <>
    <StarRating
      rating={rating}
      onChange={setRating}
    />

    <Button title='button'onPress={() => {console.log(rating)}}></Button>
    </>
  );
};

export default function App() {

  return (
    <>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Join" component={Join} />
          <Stack.Screen name="MyPage" component={MyPage} />
          <Stack.Screen name="MypageModify" component={MypageModify} />
          <Stack.Screen name="AnimalDetail" component={AnimalDetail} />
          <Stack.Screen name="AnimalList" component={AnimalList} />
          <Stack.Screen name="AddAnimal" component={AddAnimal} />
          <Stack.Screen name="AddFood" component={AddFood} />
          <Stack.Screen name="Food" component={Food} />
          <Stack.Screen name="Play" component={Play} />
          <Stack.Screen name="MyPoint" component={MyPoint} />
          <Stack.Screen name="MapDesign" component={MapDesign} />
          <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
