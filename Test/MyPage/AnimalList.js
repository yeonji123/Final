import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert, Modal, Pressable, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
//npm install expo-checkbox
import AsyncStorage from '@react-native-async-storage/async-storage'



//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Stack = createStackNavigator();

//동물 info가져오기
export default function AnimalDetail({ navigation: { navigate } }) {

    const [data, setData] = React.useState();
    // 모달
    const [modalVisible, setModalVisible] = React.useState(false);
    // 모달에 보이는 데이터 값
    const [modalData, setModalData] = React.useState("");
    const [mImg, setMImg] = React.useState("");


    const save = async () => {
        try {
            await AsyncStorage.setItem('key', 'value');
            await AsyncStorage.setItem('info', JSON.stringify(info)); // 객체 형태 저장
        } catch (e) {
            // 오류 예외 처리
        }
    }

    React.useEffect(() => {
        //선택한 애완동물의 정보를 가져오려면 props사용해야함
        //아직 미완
        save();
        // 서버에 요청
        // 애완동물 목록 불러오기
        axios.post("http://192.168.2.94:5000/animal/list", null, {
            params: {
                id: "user" //sessionStorage에 있는 id값
            }
        })
            .then(function (res) {
                console.log(res);
                console.log(res.data);
                setData(res.data);

            })
            .catch(function (error) {
                console.log(error)
            })


    }, []);


    return (

        <View style={styles.container}>
            <View style={{ alignContent: 'center', justifyContent: 'center' }}>
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
                            <View sytle={{ alignContent: 'center', width: '100%', padding: 10, alignItems: 'center', }}>
                                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                                    <View style={{ width: '50%', backgroundColor: 'yellow', alignItems: 'center', }}>
                                        {
                                            mImg === null ? <Image style={{ resizeMode: "cover", width: 100, height: 100, borderRadius: 50, borderWidth: 3 }} source={{ uri: "https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif" }} />:
                                            <Image style={{ resizeMode: "cover", width: 100, height: 100, borderRadius: 50, borderWidth: 3 }} source={{ uri: mImg }} />
                                        }
                                    </View>

                                    <View style={{ backgroundColor: 'red', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 30, padding: 10 }}>{modalData.aname}</Text>
                                        <Text style={{ fontSize: 20, padding: 10 }}>{modalData.abreed}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={{ fontSize: 15 }}>생일</Text>
                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', width: "60%", backgroundColor: 'lightgreen' }}>
                                        <Text style={{ fontSize: 15 }}>{modalData.abirth}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={{ fontSize: 15 }}>성별</Text>
                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', width: "60%", backgroundColor: 'lightgreen' }}>
                                        <Text style={{ fontSize: 15 }}>{modalData.abreed}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={{ fontSize: 15 }}>중성화</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: "60%", alignItems: 'center', }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", backgroundColor: 'lightgreen', justifyContent:'center' }}>
                                            <Checkbox style={styles.checkbox} value={modalData.aneut} />
                                            <Text style={styles.paragraph}>중성화 여부</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        navigate("ModifyAnimal", {
                                            info: [modalData.aname, modalData.asex, modalData.abirth, modalData.abreed, modalData.aneut, modalData.aphoto],
                                            title: modalData.aName,
                                        })
                                    }}>
                                    <Text style={styles.textStyle}>Modify</Text>
                                </Pressable>
                                <Text>     </Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <Text style={styles.title}> 애완동물 목록 </Text>
            <View style={styles.title}>
                {/* map형식으로 계속 부름 */}
                {
                    data && data.map((e, idx) => {
                        return (<>

                            <Pressable onPress={() => {
                                console.log(e)
                                setModalData(e);
                                setMImg(e.aphoto)
                                //모달창으로 값 보여줌
                                setModalVisible(true)

                                //네비게이트로 화면 전환
                                // navigate("AnimalDetail", {
                                //     info: [e.aname, e.asex, e.abirth, e.abreed, e.aneut, e.aphoto],
                                //     title: e.aName,
                                // })
                            }}>
                                <View style={{ padding: 10, backgroundColor: "red" }} key={e} onPress={() => Alert.alert('ModifyAnimalInfo 페이지로 전환')}>
                                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                                        <View style={styles.infoNum}>
                                            <Text style={{ fontSize: 20 }}>{idx + 1}</Text>
                                        </View>
                                        <View style={styles.infoName}>
                                            <Text style={{ fontSize: 20 }}>이름</Text>
                                        </View>
                                        <View style={styles.info}>
                                            <Text style={{ fontSize: 20 }}>{e.aname}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Pressable></>);
                    })
                }


                <View>
                    <Button title="추가" onPress={() => {
                        navigate("AddAnimal")
                    }} />
                </View>



            </View>
        </View>

    )
}

const styles = StyleSheet.create({
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
    infoName: {
        padding: 10,
        alignItems: 'center',
        width: "30%",
    },
    infoNum: {
        backgroundColor: "white",
        padding: 10,
        alignItems: 'center',
        width: "20%"
    },
    info: {
        backgroundColor: "blue",
        padding: 10,
        width: "50%",
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
