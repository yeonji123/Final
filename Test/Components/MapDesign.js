import React, { useEffect, useState } from 'react';
import MapView, { Marker, Circle, Callout, AnimatedRegion, Polyline, MarkerAnimated } from 'react-native-maps';
// npm i react-native-maps
import { Text, View, StyleSheet, Button, Alert, Modal, Pressable, Image, Dimensions, TextInput, useRef } from 'react-native';
import * as Location from 'expo-location';

export default function MapDesign() {
    const mapRef = React.useRef(null);
    const [region, setRegion] = React.useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const tokyoRegion = {
        latitude: 35.6762,
        longitude: 139.6503,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    const goToTokyo = () => {
        //complete this animation in 3 seconds
        mapRef.current.animateToRegion(tokyoRegion, 3 * 1000);
    };
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 24.8607,
                    longitude: 67.0011,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onRegionChangeComplete={(region) => setRegion(region)}
            />
            <Button onPress={() => goToTokyo()} title="Go to Tokyo" />
            <Text style={styles.text}>Current latitude{region.latitude}</Text>
            <Text style={styles.text}>Current longitude{region.longitude}</Text>
            <Pressable style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                elevation: 3,
                width: '20%',
                margin: 3
            }} onPress={() => {
                console.log('didk')
            }}>
                <View style={{ backgroundColor: 'red' }}>
                </View>
            </Pressable>
            <View style={styles.buttons}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                    
                    <Pressable style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 4,
                            elevation: 3,
                            backgroundColor: '#F7931D',
                            width: '30%',
                            margin: 3
                        }} onPress={() => {
                            console.log('dnlcldl')
                        }}>
                            <Text>위치확정</Text>
                        </Pressable> 
                            <Pressable style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4,
                                elevation: 3,
                                backgroundColor: '#F7931D',
                                width: '30%',
                                margin: 3
                            }} onPress={() => {
                                console.log("tkscorg")
                            }}>
                                <Text>산책하쉴</Text>
                            </Pressable>

                 

                    <Pressable style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        elevation: 3,
                        backgroundColor: '#3AB5A9',
                        width: '26%',
                        margin: 3
                    }} onPress={() => {
                        console.log("Rmx")
                    }}>
                        <Text >산책 끝</Text>
                    </Pressable>


                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        fontSize: 20,
        backgroundColor: "lightblue",
    },
});