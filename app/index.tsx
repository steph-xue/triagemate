import * as React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './landing';
import { router } from 'expo-router';

// Entry route that renders the landing screen
export default function Home() {
  return <LandingScreen />;
}