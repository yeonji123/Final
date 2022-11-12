import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  CheckLocation  from './components/checkLocation';
import React, { useEffect, useState } from "react";
import { Button } from 'react-native';

export default function App() {
  const [click, setClick] = useState();
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="button"
        onPress={() => { setClick(true) }} />
      {
        click ? <CheckLocation /> : null
      }

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
