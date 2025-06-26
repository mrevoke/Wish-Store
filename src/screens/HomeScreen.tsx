import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import { observer } from "mobx-react-lite";
import { wishStore } from "../stores/WishStore";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { WishCard } from "../components/WishCard";
import { EditWishModal } from "../components/EditWishModal";

export const HomeScreen = observer(() => {
  const navigation = useNavigation<any>();
  const [editingWish, setEditingWish] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = (wish: any) => {
    setEditingWish(wish);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Wish", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => wishStore.deleteWish(id), style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={wishStore.wishes.slice()}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => wishStore.setWishes(data)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, drag, isActive }) => (
          <WishCard
            item={item}
            drag={drag}
            isActive={isActive}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddWish")}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <EditWishModal
        visible={modalVisible}
        wish={editingWish}
        setWish={setEditingWish}
        onSave={() => {
          if (editingWish?.address?.trim()) {
            wishStore.updateWish(editingWish);
            setModalVisible(false);
          } else {
            Alert.alert("Please enter address");
          }
        }}
        onCancel={() => setModalVisible(false)}
      />
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
});
