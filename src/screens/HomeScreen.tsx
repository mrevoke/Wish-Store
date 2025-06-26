import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { observer } from "mobx-react-lite";
import { wishStore } from "../stores/WishStore";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";

export const HomeScreen = observer(() => {
  const navigation = useNavigation<any>();
  const [editingWish, setEditingWish] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDragEnd = ({ data }: { data: typeof wishStore.wishes }) => {
    wishStore.setWishes(data);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Wish", "Are you sure you want to delete this wish?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => wishStore.deleteWish(id),
      },
    ]);
  };

  const handleEdit = (wish: any) => {
    setEditingWish(wish);
    setModalVisible(true);
  };

  const saveEditedWish = () => {
    if (!editingWish?.address?.trim()) {
      Alert.alert("Please enter an address");
      return;
    }
    wishStore.updateWish(editingWish);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={wishStore.wishes.slice()}
        keyExtractor={(item) => item.id}
        onDragEnd={handleDragEnd}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, drag, isActive }) => (
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
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.note}>{item.note}</Text>
                {item.address && (
                  <Text style={styles.address}>📍 {item.address}</Text>
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.icon}>🖊</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.icon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddWish")}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* 💎 Bottom Sheet Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Edit Wish</Text>

              <TextInput
                placeholder="Place name"
                value={editingWish?.name}
                onChangeText={(text) =>
                  setEditingWish({ ...editingWish, name: text })
                }
                style={styles.input}
              />
              <TextInput
                placeholder="Note"
                value={editingWish?.note}
                onChangeText={(text) =>
                  setEditingWish({ ...editingWish, note: text })
                }
                style={styles.input}
              />
              <TextInput
                placeholder="Address"
                value={editingWish?.address}
                onChangeText={(text) =>
                  setEditingWish({ ...editingWish, address: text })
                }
                style={styles.input}
              />
              <TextInput
                placeholder="Image URL"
                value={editingWish?.imageUri}
                onChangeText={(text) =>
                  setEditingWish({ ...editingWish, imageUri: text })
                }
                style={styles.input}
              />
              {editingWish?.imageUri ? (
                <Image
                  source={{ uri: editingWish.imageUri }}
                  style={styles.imagePreview}
                />
              ) : null}

              <TouchableOpacity onPress={saveEditedWish} style={styles.button}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.button, { backgroundColor: "#999", marginTop: 10 }]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F2F4F7",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
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
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#4a90e2",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 30,
    color: "#fff",
    lineHeight: 34,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  imagePreview: {
    height: 180,
    width: "100%",
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
