import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import Markdown from 'react-native-markdown-display';
import { GEMINI_API_KEY } from '@env'; 
export const WishCard = ({
  item,
  drag,
  isActive,
  onEdit,
  onDelete,
}: {
  item: any;
  drag: () => void;
  isActive: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [planResult, setPlanResult] = useState("");

  const generatePlan = async () => {
    setPlanResult("Generating...");
    try {
      const prompt = `Make a travel plan for ${item.name}, ${item.address}. Number of days: ${days}, Budget: $${budget}`;
  
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }]
  }),
});

      console.log("Response status:", response);
      const json = await response.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || "No plan received.";
      setPlanResult(text);
    } catch (error) {
      setPlanResult("Error generating plan.");
    }
  };

  return (
    <View
      style={[
        styles.card,
        isActive && { opacity: 0.8, transform: [{ scale: 0.97 }] },
      ]}
    >
      <TouchableOpacity onLongPress={drag} activeOpacity={0.9}>
        {item.imageUri && (
          <Image source={{ uri: item.imageUri }} style={styles.image} />
        )}
        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.actionsInline}>
              <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
                <Text style={styles.actionIcon}>✎</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
                <Text style={styles.actionIcon}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.note}>{item.note}</Text>
          {item.address && (
            <View style={styles.addressRow}>
              <Text style={styles.iconText}>📍</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.planButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.planButtonText}>🗺 Make a Plan</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Plan for {item.name}</Text>

            <TextInput
              placeholder="Number of days"
              value={days}
              onChangeText={setDays}
              keyboardType="number-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="Budget (in ₹)"
              value={budget}
              onChangeText={setBudget}
              keyboardType="number-pad"
              style={styles.input}
            />

            <TouchableOpacity style={styles.generateBtn} onPress={generatePlan}>
              <Text style={styles.buttonText}>Generate Plan</Text>
            </TouchableOpacity>

<ScrollView style={{ maxHeight: 200, marginTop: 10 }}>
  <Markdown style={markdownStyles}>{planResult}</Markdown>
</ScrollView>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsInline: {
    flexDirection: "row",
    marginLeft: 10,
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 14,
  },
  note: {
    fontSize: 14,
    color: "#4B4B4D",
    marginTop: 6,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  iconText: {
    fontSize: 16,
    color: "#007AFF",
    marginRight: 8,
    fontWeight: "600",
  },
  address: {
    fontSize: 13,
    color: "#6E6E73",
    fontStyle: "italic",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    flex: 1,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F2F2F7",
  },
  actionIcon: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "600",
  },
  planButton: {
    marginTop: 12,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  planButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
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
  planText: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
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
