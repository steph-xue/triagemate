import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from "./components/navbar";


// Displays the patient's profile information alongside the navigation bar
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/patient.png')} />
      <View style={styles.textContainer}>
        <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'transparent']}
            style={styles.insetTop}
        />
        <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.1)']}
            style={styles.insetBottom}
        />
        <LinearGradient
            colors={['rgba(0,0,0,0.03)', 'transparent']}
            style={styles.insetLeft}
        />
        <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.03)']}
            style={styles.insetRight}
        />

        <Text style={styles.profileName}>Emily Chen </Text>

        <Text style={styles.profileText}>
            <Text style={styles.label}>Date of Birth: </Text>May 12, 1987
        </Text>

        <Text style={styles.profileText}>
            <Text style={styles.label}>Age: </Text>36
        </Text>
        
        <Text style={styles.profileText}>
            <Text style={styles.label}>Personal Health Number: </Text>984638473
        </Text>

        <Text style={styles.profileText}>
            <Text style={styles.label}>Address: </Text>1234 Maplewood Drive, Vancouver, BC V5K 1A1
        </Text>

        <Text style={styles.profileText}>
            <Text style={styles.label}>Phone Number: </Text>(778) 872-3923
        </Text>

      </View>
      <NavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0b2c52',
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: 20,
    paddingLeft: 15,
    borderRadius: 25,

    // Soft iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,         // Lower opacity for softness
    shadowRadius: 50,             // More blur for smooth edges

    // Soft Android shadow
    elevation: 10, 
  },
  insetTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 1,
  },
  insetBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    zIndex: 1,
  },
  insetLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    zIndex: 1,
  },
  insetRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    zIndex: 1,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 50,
  },
  profileName: {
    fontSize: 25,
    fontWeight: 800,
    color: '#1c2447',
    marginBottom: 30,
    textAlign: 'center',
    width: 250,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 500,
    color: '#1c2447',
    marginBottom: 20,
    textAlign: 'left',
    width: 350,
    paddingLeft: 20,
  },
  label: {
    fontWeight: 700,
  },
});