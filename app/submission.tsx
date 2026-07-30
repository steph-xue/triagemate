import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';


// Confirms that the triage report was submitted successfully
export default function SubmissionSuccessScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.imageCheck} source={require('../assets/images/check-mark.png')} />
      <Text style={styles.title}>Submission Success</Text>
      <Text style={styles.text}>Your report has been sent to the healthcare triage team.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/input')}>
        <Text style={styles.buttonText}>Submit Another Report</Text>
      </TouchableOpacity>
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
  imageCheck: {
    width: 250,
    height: 250,
    marginTop: 100,
  },
  title: {
    fontSize: 35,
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: 50,
    textAlign: 'center',
    width: 400,
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    color: '#ffffff',
    marginBottom: 60,
    textAlign: 'center',
    width: 300,
  },
  button: {
    backgroundColor: '#ffffff',
    marginVertical: 30,
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0b2c52',
    textAlign: 'center',
  },
});