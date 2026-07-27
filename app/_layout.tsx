import * as React from 'react';

import { Stack } from "expo-router";

export default function RootLayout() {
  React.useEffect(() => {
    // wakes up the Render backend as soon as the app opens, so it's
    // already warm by the time the user submits a symptom report
    fetch("https://triagemate.onrender.com/health").catch(() => {});
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ 
            title: "TriageMate",
            headerStyle: { backgroundColor: '#1c2447' },
            headerTintColor: '#fff', 
            headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="input"
        options={{ 
            title: "Symptoms",
            headerStyle: { backgroundColor: '#1c2447' },
            headerTintColor: '#fff', 
            headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="patient"
        options={{ 
            title: "Patient Profile",
            headerStyle: { backgroundColor: '#1c2447' },
            headerTintColor: '#fff', 
            headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="loading"
        options={{ 
            title: "",
            headerStyle: { backgroundColor: '#1c2447' },
            headerTintColor: '#fff', 
            headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="result"
        options={{ 
            title: "Triage Report",
            headerStyle: { backgroundColor: '#1c2447' },
            headerTintColor: '#fff', 
            headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="submission"
        options={{ 
            title: "Submission",
            headerStyle: { backgroundColor: '#1c2447' },
            headerTintColor: '#fff', 
            headerShadowVisible: false
        }}
      />
    </Stack>
  );
}