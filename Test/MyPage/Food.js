import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert, Modal, Pressable, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
//npm install expo-checkbox
import AsyncStorage from '@react-native-async-storage/async-storage';
//expo install @react-native-async-storage/async-storage


//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { set } from 'react-native-reanimated';
const Stack = createStackNavigator();

//동물 info가져오기
export default function AddFood(navigation) {

    const [modalVisible, setModalVisible] = React.useState(true);


    return (
        <View style={styles.container}>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>추가하기</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="시간"
                            keyboardType="number-pad"
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>


            <Text style={styles.title}> 봡 체크 </Text>
            <View style={styles.title}>
                <View style={{ padding: 10, backgroundColor: "red" }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <Text style={{ fontSize: 30 }}>
                            우리의 밥먹는 시간
                        </Text>
                    </View>
                </View>
                {/* map 형식으로 돌면서 등록했던 내용 보여주기 */}
                <View style={{ paddingHorizontal: 10, }}>
                    {/* 여기를 맵으로 */}
                    <View style={{ padding: 10, flexDirection: 'row', width: '100%', }}>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%', backgroundColor: "white" }}>
                            <View style={{ width :"25%", alignItems:'center', }}>
                                <Button title="삭제" />
                            </View>
                            <View style={{ alignItems: 'center', width: "50%",justifyContent: "center",}}>
                                <Text style={{ fontSize: 20,  }}>dfdfd</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', width:'25%', }}>
                                <Button title="modify"/>
                            </View>
                        </View>
                    </View>
                    
                </View>

                <View>
                    <Button title="수정" onPress={() => Alert.alert('Food 페이지로 전환')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#eaeaea',
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    num:{
        padding:10,
        alignItems:'center',
        width:'30%',
    },
    infoName: {
        padding: 10,
        alignItems: 'center',
        width: "50%",
    },
    info: {
        padding: 10,
        width: "35%",
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
    },
    paragraph: {
        fontSize: 15,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});
