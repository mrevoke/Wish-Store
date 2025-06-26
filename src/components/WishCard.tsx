// components/WishCard.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

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
}) => (
  <View
    style={[
      styles.card,
      isActive && { opacity: 0.8, transform: [{ scale: 0.97 }] },
    ]}
  >
    <TouchableOpacity onLongPress={drag} activeOpacity={0.9}>
      {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.image} />}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.note}>{item.note}</Text>
        {item.address && <Text style={styles.address}>📍 {item.address}</Text>}
      </View>
    </TouchableOpacity>

    <View style={styles.actions}>
      <TouchableOpacity onPress={onEdit}>
        <Text style={styles.icon}>🖊</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.icon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  note: {
    fontSize: 14,
    color: "#4B4B4D",
    marginBottom: 6,
  },
  address: {
    fontSize: 13,
    color: "#6E6E73",
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    gap: 16,
  },
  icon: {
    fontSize: 20,
  },
});
