import { Component, useEffect, useState } from "react";
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from "expo-location";

const KakaoShare = () => {
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    const getWeather = async () => {
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({ accuracy: 5 });
        const location = await Location.reverseGeocodeAsync(
            { latitude, longitude },
            { useGoogleMaps: false }
        );


        console.log(location);
        console.log(latitude);
        console.log(longitude);

    }

    useEffect(() => {
        getWeather();
      }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude : latitude,
                longitude : longitude,
                latitudeDelta : 0.0922,
                longitudeDelta : 0.0421,
            }}/>
        </View>
    );
}
export default KakaoShare;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});