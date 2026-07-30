import { useLocalSearchParams, router } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Displays the structured triage report and lets the user confirm submission
export default function ResultScreen() {
  const { chiefComplaint, symptomDetails, riskFactors, redFlags } = useLocalSearchParams();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Report Preview</Text>

      <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.section}>
          <View style={styles.headingRow}>
            <Ionicons name="chatbox-ellipses" size={25} color="#ffffff" style={styles.icon} />
            <Text style={styles.heading}>Chief Complaint</Text>
          </View>
          <Text style={styles.body}>{chiefComplaint}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.headingRow}>
            <Ionicons name="document-text" size={25} color="#ffffff" style={styles.icon} />
            <Text style={styles.heading}>Symptom Summary</Text>
          </View>
          <Text style={styles.body}>{symptomDetails}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.headingRow}>
            <Ionicons name="warning" size={25} color="#ffffff" style={styles.icon} />
            <Text style={styles.heading}>Risk Factors</Text>
          </View>
          <Text style={styles.body}>{riskFactors}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.headingRow}>
            <Ionicons name="alert-circle" size={25} color="#ffffff" style={styles.icon} />
            <Text style={styles.heading}>Potential Red Flags</Text>
          </View>
          <Text style={styles.body}>{redFlags}</Text>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/submission')}>
        <Text style={styles.submitButtonText}>Confirm & Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b2c52",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginTop: -10,
    marginBottom: 60,
  },
  scrollArea: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff33",
    paddingBottom: 10,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
    marginTop: -12,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 10,
  },
  body: {
    fontSize: 18,
    color: "#e0e0e0",
    lineHeight: 22,
  },
  submitButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 60,
  },
  submitButtonText: {
    color: "#0b2c52",
    fontSize: 18,
    fontWeight: "700",
  },
});