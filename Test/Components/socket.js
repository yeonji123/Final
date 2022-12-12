import * as React from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { Text, View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';

var stompClient = null; // stompClient 로 연결하는거 같다.

export default function App() {

    const [privateChats, setPrivateChats] = React.useState(new Map()); // 나는 퍼블릭 챗만 쓰지 않을까  
    const [publicChats, setPublicChats] = React.useState([]); // 채팅을 저장
    const [tab, setTab] = React.useState("CHATROOM");

    const [userData, setUserData] = React.useState({
        username: '',
        receivername: '',
        connected: false, // 처음 상태는 false
        message: ''
    });

    React.useEffect(() => {
        console.log(userData); // 바뀔 때 마다 찍어줌 
    }, [userData])


    const connect = () => {
        console.log("connect 실행");
        let Sock = new SockJS('http://192.168.2.77:5000/ws'); //일단 급하게 로컬 호스트로 줬음 /ws를 무조건 붙여주어야 Stomp의 메서드가 인식한다. 
        stompClient = over(Sock); // over로 소켓의 주소를 넣는다. 
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, "connected": true }); // userData의 connected 속성을 true로 바꿔준다.
        stompClient.subscribe('/chatroom/public', onMessageReceived); // stompClient의 구독을 추가 public 채팅룸
        // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage); //stompClient의 구독을 추가 개인에게
        userJoin(); //userJoin 함수를 실행
    }

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username, // username 을 메시지안에 넣는다 
            status: "JOIN" //message status "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage)); //JSON형태로 포장하는건가? 전부에게 보낸다
    }

    const onMessageReceived = (payload) => { // /chatroom/public으로부터 받는 메시지를 처리하는 함수.
        var payloadData = JSON.parse(payload.body); // payloadData가 해당 JSON을 파싱받아 저장된다.
        switch (payloadData.status) { // payloadData의 status의 상태에 따라서 무엇을 할지 정해진다.
            case "JOIN": // JOIN이라면
                if (!privateChats.get(payloadData.senderName)) { //받은 채팅에서 해당이름이 존재하지 않는다면
                    privateChats.set(payloadData.senderName, []); // 받은 닉네임을 배열에 추가한다 그리고 새로운 배열을 추가
                    setPrivateChats(new Map(privateChats)); //새로운 귓속말 채팅을 생성 
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData); //message라면
                setPublicChats([...publicChats]); // 배열에 채팅을 저장.
                break;
        }
    }

    const onError = (err) => {
        console.log(err); // 접속이 이상하면 콘솔에러를 띄워준다.

    }

    const sendValue = () => { // 메시지를 보내는 함수이다.
        if (stompClient) { // if문을 왜하는거지? <= 이해가 된다면 알려줘
            var chatMessage = { // JSON 형태로 만들어야하니 변수선언
                senderName: userData.username, // 보내는 사람의 이름은 현재 소켓의 username
                message: userData.message, // 메시지는 userData의 메시지.
                status: "MESSAGE" // 상태는 MESSAGE
            };
            console.log(chatMessage); // 변수를 console.log에 찍는다.
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage)); // 소켓 서버에 현재 변수를 보내준다.
            setUserData({ ...userData, "message": "" }); // userData의 메시지를 초기화 해준다.
        }
    }

    const handleUsername = (event) => { //처음에 유저네임을 받으면 그사람의 닉네임을 userData JSON의 username에 넣어준다.
        const value = event
        setUserData({ ...userData, "username": value });
    }

    const registerUser = () => { // 유저 입장.
        connect(); // 커넥트 함수 불러온다.
    }

    const handleMessage = (event) => { // 메시지 핸들러
        const value = event;
        setUserData({ ...userData, "message": value });
    }

    return (
        <View style={styles.container}>
            {userData.connected ?
                <View style={styles.container}>
                    <View style={{
                        backgroundColor: '#ffeece',
                        padding: 5,
                        flexGrow: 1
                    }}>
                        <ScrollView>
                            {
                                publicChats.map((chat, index) => {
                                    return (
                                        <Text key={index}>{chat.senderName} : {chat.message}</Text>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <TextInput style={{
                            borderWidth: 1,
                            borderColor: 'black',
                            flexGrow: 1,
                            padding: 5,
                        }}
                            value={userData.message}
                            placeholder={'Add Message'}
                            onChangeText={(text) => handleMessage(text)}
                        />
                        <Button
                            onPress={sendValue}
                            title="send"
                        />
                    </View>
                </View>
                :
                <View>
                    <TextInput
                        id="user-name"
                        placeholder='닉네임 설정해줘'
                        name="userName"
                        value={userData.username}
                        onChangeText={(text) => handleUsername(text)}
                    />
                    <Button
                        onPress={registerUser}
                        title="send"
                    />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        paddingTop: 30,
        padding: 8,
    },

});