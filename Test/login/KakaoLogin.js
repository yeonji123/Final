import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

// other import settings...
const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const KakaoLogin = () => {
    const [val, setVal] =useState();
    const [userdata, setuserData] = useState();
    
    const id = "74dcd7c8555b0f1c9d94f04c363cdbed";
    const redirect ="http://192.168.2.77:5000/oauth/callback/kakao";

    function LogInProgress(data) {
        console.log("loginProgress");
        console.log(data);
        // access code는 url에 붙어 장황하게 날아온다.
        // substringd으로 url에서 code=뒤를 substring하면 된다.
        const exp = "code=";
        var condition = data.indexOf(exp);
        console.log("code=",condition);

        if (condition != -1) {
            var request_code = data.substring(condition + exp.length);
            console.log("access code :: " + request_code);
            // 토큰값 받기
            requestToken(request_code);
        }
    };



    const requestToken = async (request_code) => {
        var returnValue = "none";
        var request_token_url = "https://kauth.kakao.com/oauth/token";
        console.log(request_code);
        axios({
            method: "post",
            url: request_token_url,
            params: {
                grant_type: 'authorization_code',
                client_id: id,
                redirect_uri: redirect,
                client_secret:'ksULm1tC9UM6eApY8BcO3yfrNk5eChYE',
                code: request_code,
            },
        }).then(function (response) {
            returnValue = response.data.access_token;
            console.log(response.data);
            setuserData(response.data);
            setVal(returnValue);
        }).catch(function (error) {
            console.log('error', error);
        });

    };



    return (
        <View style={{flex:1 }}>
            <Text>      {val},,,,{userdata}                                                                             </Text>
            <WebView
                originWhitelist={['*']}
                scalesPageToFit={false}
                style={{ marginTop: 30 }}
                source={{ uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id='+id+'&redirect_uri='+redirect }}
                injectedJavaScript={runFirst}
                javaScriptEnabled={true}
                onMessage={(event) => { 
                    console.log(event.nativeEvent);
                    LogInProgress(event.nativeEvent['url'])}}
            // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
            />
        </View>
    );
};



export default KakaoLogin;