import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

// Displays a processing indicator while the triage report is generated
export default function LoadingScreen() {
    const triage = useLocalSearchParams();

    useEffect(() => {
        const timer = setTimeout(() => {
        }, 5000);
    
        return () => clearTimeout(timer);
      }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Processing</Text>
      <Text style={styles.subtitle}>Summarizing your symptoms...</Text>
      <ActivityIndicator
        size="large"
        color="#ffffff"
        style={[styles.spinner, { transform: [{ scale: 1.5 }] }]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0b2c52", // Match input.tsx background
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 40,
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: 20,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 20,
      color: "#ffffff",
      marginBottom: 30,
      textAlign: "center",
    },
    spinner: {
      marginTop: 10,
      marginBottom: 70,
      width: 200,
    },
  });