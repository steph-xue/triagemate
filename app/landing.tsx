import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';


// Landing screen introducing the app and prompting users to begin
export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/logo.png')} />
      <Text style={styles.title}>Speak or type your symptoms in any language</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/input')}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b2c52',
  },
  image: {
    width: 400,
    height: 400,
    marginTop: -20,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 40,
    textAlign: 'center',
    width: 280,
  },
  button: {
    backgroundColor: '#ffffff',
    marginVertical: 30,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#0b2c52',
    textAlign: 'center',
  },
});