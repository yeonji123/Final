import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import Constants from 'expo-constants';


//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//동물 info가져오기
export default function AnimalDetail(navigation) {


    React.useEffect(() => {

        // 서버에 요청
        // 애완동물 정보 불러오기
        /*
        axios.post("http://192.168.2.94:5000/member/mypage", null, {
            params : {
                id: "user3" //sessionStorage에 있는 id값
            }
        })
        .then(function (res){
            console.log(res.data);

            setId(res.data.id);
            setPw(res.data.pw);
            setName(res.data.name);
            setNickname(res.data.nickname);
            setPhone(res.data.phone);
            setAddress(res.data.address);
            // setDetailAddress(res.data.detail_Address);
            //setCheck(res.data.check);
        })
        .catch(function (error){
            console.log(error)
        })*/



    }, []);




}
