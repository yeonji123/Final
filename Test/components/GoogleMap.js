import Styled from 'styled-components/native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { Component, useEffect, useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, Text, View } from 'react-native';
import { set } from 'react-native-reanimated';
import { render } from 'react-dom';

import {fromJS} from 'immutable';
import styles from './styles';


const Container = Styled.View`
    flex: 1;
`;

const URL='https://maps.google.com/maps/api/geocode/json?latlng=';

export default class GoogleMap extends Component {
    state = {
        data : fromJS({
            address:'loading...'
        })
    }

    componentDidMount(){
        const setPosition = pos =>{
            this.data=this.data.merge(pos.coords);

            const{
                coords:{latitude,longitude}
            } = pos;
        
            fetch(`${URL}${atotide},${longitude}`)
                .then(resp => resp.json(), e => console.error(e))
                .then(({ results: [{ formatted_address }] }) => {
                    this.data = this.data.set('address', formatted_address);
                });

        }


        navigator.geolocation.getCurrentPosition(setPosition);

        this.watcher - navigator.geolocation.watchPosition(
            setPosition,
            err => console.error(err),
            { enableHighAccuracy: true }
        );

    }

    componenWillUnmout(){
        navigator.geolocation.clearWatch(this.watcher);
    }

    render() {
        const state = [...this.data.sortBy((v,k) => k).entries()];

        return (
            <View style={StyleSheet.container}>
                {state.map(([k,v]) => (
                    <Text key={k} style={ styles.label}>
                        {`${k[0].toUpperCase()}${k.slice(1)}`}:{v}
                    </Text>

                ))}

            </View>
        );
    }



    /*
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    const getWeather = async () => {
        console.log("getWhether")
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({ accuracy: 5 });
        const location = await Location.reverseGeocodeAsync(
            { latitude, longitude },
            { useGoogleMaps: false }
        );

        setLatitude(latitude);
        setLongitude(longitude);

        console.log(location);
        console.log(latitude);
        console.log(longitude);

    }

    useEffect(() => {
        console.log("dddddddddddddd");
        getWeather();
    }, []);


    return (
        <Container>
            <Text>dfdddfdfdfdfdfdfdddddddddddddddddfdfdfdfdfdfddffdf</Text>
            <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE}  initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
            }} />
            <Marker
                coordinate={{ latitude: latitude, longitude: longitude }}
                title="this is a marker"
                description="this is a marker example"
            />
        </Container>
    );*/
}
//export default GoogleMap;