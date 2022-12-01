import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Circle, Callout, AnimatedRegion, Polyline, MarkerAnimated } from 'react-native-maps';
// npm i react-native-maps
import { Text, View, StyleSheet, Button, Alert, Modal, Pressable, Image } from 'react-native';
import * as Location from 'expo-location';
// npm i expo-location
import { Camera, Constants } from 'expo-camera';
//npm install react-native-popup-confirm-toast

//이미지 업로드
import * as ImagePicker from 'expo-image-picker';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();


export default function WalkTogether({navigation}) {

  const [mapRegion, setmapRegion] = React.useState();

  // 무한 루프 서버에 계속 보내기
  const [number, setNumber] = React.useState(0);

  //함께 산책할 사람 리스트
  const [people, setPeople] = React.useState();


  // 현재 위치를 가져와야함
  // 로딩되는데 시간이 좀 걸린다ㅏ
  useEffect(() => {

    (async () => {
      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setmapRegion({ // 현재 위치
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005, //확대되는 범위
        longitudeDelta: 0.005, //확대되는 범위
      })
    })();

  }, []);

  /*
  useEffect(() => {
    setInterval(() => reqAxios(), 15000);

  }, []);

  //서버에 주변에 있는 사람들의 리스트를 받아옴
  const reqAxios = () => {

    console.log('hi')
    // axios.post("링크", null, {

    //   params: {
    //     id: "user",
    //     cEndTime: time,
    //     cDate: day,
    //     cPhoto: imgUri
    //   }
    // })
    //   .then(function (res) {
    //     console.log(res.data); 
    //     setPeople(res.data); //같이 산책할 사람 데이터 리스트
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  }*/






  return (
    <View style={styles.container}>
      <View style={styles.map}>

        <MapView
          style={{ alignSelf: 'stretch', height: '100%' }}
          // region={mapRegion}
          initialRegion={mapRegion}

          //사용자 위치에 맞게 마커가 표시된다.
          showsUserLocation={true}
          // userLocationUpdateInterval =
          onUserLocationChange={(e) => {
            //사용자가 이동하면 위치를 저장함
            console.log("onUserLocationChange", e.nativeEvent.coordinate);
           
            const newCoordinate = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            }
            // setGps(gps.concat(newCoordinate));
            // console.log("gps", gps);

            setmapRegion(newCoordinate)
            // setmapRegion(gps.concat(newCoordinate));
          }}
        >
          <Marker
            coordinate={mapRegion}
            draggable={true} //마커 드래그 가능
            onDragStart={(e) => { console.log("Drag start", e.nativeEvent.coordinate); }} //드래그 한 위도, 경도 나타냄
            onDragEnd={(e) => {
              setmapRegion({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              });
              // setLatit(lat)
              // setLongit(long)
            }} //드래그 한 곳으로 마커 이동
          >
            <Callout>
              <Text>This is Callout</Text>
            </Callout>
          </Marker>

        </MapView>


        <View style={styles.buttons}>
          <Pressable style={styles.button}  >
            <Text >      start      </Text>
          </Pressable>

          <Pressable style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'red',
            width: '30%'
          }}  >
            <Text>stop</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  map: {
    width: "100%",
    height: "85%",
  },
  buttons: {
    padding: 10,
    height: "15%",
    flexDirection: 'row',
    widh: "100%",
    backgroundColor: 'yellow',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'orange',
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
    padding: 18,
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
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'yellow'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
    width: 300,
    height: 500
    // height:Constants.height*0.7,
    // width:Constants.width
  },
  takeButton: {
    borderColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: "#ff6600",
    borderRadius: 100
  }
});