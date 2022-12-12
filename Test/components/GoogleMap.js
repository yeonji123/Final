import React, { useEffect, useState } from 'react';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { View, StyleSheet, Text, Dimensions, Button } from 'react-native';
import * as Location from 'expo-location';

const initialRegion = {
  latitude: 51.1261218,
  longitude: 3.347519199999965,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const GoogleMap = () => {
  const [mapRegion, setmapRegion] = useState({ //나의 위치 usestate
    latitude: 36.7987869, //위도
    longitude: 127.0757584, //경도
    // latitudeDelta: 0.0922, //확대되는 범위
    // longitudeDelta: 0.0421, //확대되는 범위
  });

    useEffect(() => {
    (async () => {
      
      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      console.log(location);
      console.log(address);
      setmapRegion({ //현재 위치
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
    })();
  }, []);

  const [region, setRegion] = React.useState(initialRegion);
  const mapRegionChangehandle = (region) => {
    console.log("region",region)
    setRegion(region);
  };


  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        // region={mapRegion}
        // initialRegion={{mapRegion}}
        region={region}
        onRegionChange={mapRegionChangehandle}


        //사용자 위치에 맞게 마커가 표시된다.
        showsUserLocation = {true}
        // userLocationUpdateInterval = 
        onUserLocationChange = {(e) => {
            console.log("onUserLocationChange", e.nativeEvent.coordinate);
            setmapRegion({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              });
        }}
      >
        <Marker
          coordinate={mapRegion}
          draggable={true} //마커 드래그 가능
          onDragStart={(e)=>{console.log("Drag start", e.nativeEvent.coordinate);}} //드래그 한 위도, 경도 나타냄
          onDragEnd={(e)=>{setmapRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          });}} //드래그 한 곳으로 마커 이동
        >
        <Callout>
          <Text>This is Callout</Text>
        </Callout>
        </Marker>
        <Circle center={mapRegion} radius={100}/>
      </MapView>
    </View>
  );
};
//{latitudeDelta: 0.0922, longitudeDelta: 0.0421}
export default GoogleMap;

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