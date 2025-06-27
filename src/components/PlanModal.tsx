// components/PlanModal.tsx
import React from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { observer } from "mobx-react-lite";
import { planStore } from "../stores/PlanStore";
import { generateTravelPlan, savePlanToStorage } from "../services/planService";

export const PlanModal = observer(({ visible, onClose, placeName, address }: {
  visible: boolean;
  onClose: () => void;
  placeName: string;
  address: string;
}) => {
  const generatePlan = async () => {
    planStore.setPlanResult("Generating...");
    const plan = await generateTravelPlan({ placeName, address, days: planStore.days, budget: planStore.budget });
    planStore.setPlanResult(plan);
    await savePlanToStorage({ placeName, address, days: planStore.days, budget: planStore.budget, plan });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Plan for {placeName}</Text>

          <TextInput
            placeholder="Number of days"
            value={planStore.days}
            onChangeText={planStore.setDays}
            keyboardType="number-pad"
            style={styles.input}
          />
          <TextInput
            placeholder="Budget (in ₹)"
            value={planStore.budget}
            onChangeText={planStore.setBudget}
            keyboardType="number-pad"
            style={styles.input}
          />

          <TouchableOpacity style={styles.generateBtn} onPress={generatePlan}>
            <Text style={styles.buttonText}>Generate Plan</Text>
          </TouchableOpacity>

          <ScrollView style={{ maxHeight: 200, marginTop: 10 }}>
            <Markdown style={markdownStyles}>{planStore.planResult}</Markdown>
          </ScrollView>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  generateBtn: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeBtn: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const markdownStyles = {
  body: {
    color: "#333",
    fontSize: 14,
    lineHeight: 20,
  },
  heading1: {
    fontSize: 20,
    fontWeight: "bold" as const,
    marginTop: 16,
    marginBottom: 12,
    lineHeight: 28,
  },
  heading2: {
    fontSize: 18,
    fontWeight: "bold" as const,
    marginTop: 14,
    lineHeight: 26,
  },
  strong: {
    fontWeight: "bold" as const,
    marginTop: 12,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 6,
  },
  bullet_list: {
    marginBottom: 8,
    marginLeft: 16,
  },
  list_item: {
    marginBottom: 4,
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline" as const,
  },
};
