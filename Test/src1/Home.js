import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Home = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{
                padding: 15,
                marginTop: 50,
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: "#fff"
                }}>{`>>  React Native Code  <<`}</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginVertical: 20,
                    marginTop: 100
                }}
            >
                <Image
                    source={{ uri: 'https://www.espruino.com/refimages/modules_ws_thumb.png' }}
                    style={{ height: 100, width: 100 }}
                />
                <Image
                    source={{ uri: 'https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-math-icon-download-icons-9.png' }}
                    style={{ height: 50, width: 50 }}
                />
                <Image
                    source={{ uri: 'https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/react-512.png' }}
                    style={{ height: 100, width: 100 }}
                />
            </View>
            <View style={{
                padding: 20,
                borderColor: '#fff',
                borderRadius: 20,
                borderWidth: 2,
                backgroundColor: '#000',
                margin: 20,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <Text
                    style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#3ABEF0',
                        textAlign: 'center'
                    }}
                >
                    {`React Native` + `\n` +
                        `+` + `\n` +
                        `Websocket`}
                </Text>
                <Text
                    style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#3ABEF0',
                        textAlign: 'center'
                    }}
                >= Chat App</Text>
            </View>
            <TouchableOpacity
                style={{
                    padding: 15,
                    backgroundColor: '#3ABEF0',
                    width: 150,
                    alignItems: 'center',
                    justifyContent: "center",
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginTop: 50
                }}
                onPress={() => { navigation.push('User') }}
            >
                <Text
                    style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 15
                    }}
                >Start Chat</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
export default Home;
