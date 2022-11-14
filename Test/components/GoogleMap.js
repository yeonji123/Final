import Styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { Component, useEffect, useState } from "react";
import * as Location from "expo-location";

const Container = Styled.View`
    flex: 1;
`;

const GoogleMap = () => {
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

        setLatitude(latitude);
        setLongitude(longitude);

        console.log(location);
        console.log(latitude);
        console.log(longitude);

    }

    useEffect(() => {
        getWeather();
    }, []);


    return (
        <Container>
            <MapView style={{ flex: 1 }} />
        </Container>
    );
}
export default GoogleMap;