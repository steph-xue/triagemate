import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import NavBar from "./components/navbar";

export default function InputScreen() {
  const [text, setText] = useState("");
  const [triageResponse, setTriageResponse] = useState();

  const handleSubmit = async () => {
    Keyboard.dismiss();
    router.push("/loading");

    try {
      await fetch("http://192.168.1.xxx:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: text }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTriageResponse(data.response.triageResponse);
        const triage = data.response.triageResponse;

      router.push({
        pathname: "/result",
        params: {
          chiefComplaint: triage.chiefComplaint,
          symptomDetails: triage.symptomDetails,
          riskFactors: triage.riskFactors,
          redFlags: triage.redFlags,
        },
      });

        setText("");
      })
      .catch(error => {
        console.error(error);
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.label}>Input Your Symptoms:</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe your symptoms here..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          returnKeyType="default"
          keyboardType="default"
          multiline={true}
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <NavBar/>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
      backgroundColor: '#0b2c52',
    },
    label: {
      fontSize: 25,
      fontWeight: 700,
      color: '#ffffff',
      marginBottom: 10,
      textAlign: "center",
    },
    input: {
      height: 450,
      borderColor: "#999",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingTop: 12,
      fontSize: 16,
      backgroundColor: "#f9f9f9",
      textAlignVertical: "top",
      marginVertical: 20,
    },
    button: {
      backgroundColor: '#ffffff',
      marginVertical: 40,
      paddingVertical: 16,
      paddingHorizontal: 50,
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 22,
      fontWeight: '700',
      color: '#0b2c52',
      textAlign: 'center',
    },
    preview: {
      marginTop: 20,
      fontSize: 16,
      color: "#555",
      textAlign: "center",
    },
  });