import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

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
      </View>
    </TouchableOpacity>
  </View>
);


const styles = StyleSheet.create({
  actionsInline: {
    flexDirection: "row",
    marginLeft: 10,
    gap:8
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    fontSize: 16,
    color: "#007AFF",
    marginRight: 8,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    flex: 1,
  },
  note: {
    fontSize: 14,
    color: "#4B4B4D",
    flex: 1,
    lineHeight: 20,
  },
  address: {
    fontSize: 13,
    color: "#6E6E73",
    fontStyle: "italic",
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    gap: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E5EA",
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
});