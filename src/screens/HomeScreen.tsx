import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import "react-native-reanimated";
import DraggableFlatList from "react-native-draggable-flatlist";
import { observer } from "mobx-react-lite";
import { wishStore } from "../stores/WishStore";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = observer(() => {
  const navigation = useNavigation<any>();

  const handleDragEnd = ({ data }: { data: typeof wishStore.wishes }) => {
    wishStore.setWishes(data); // You need to implement this action in your store
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={wishStore.wishes.slice()} // Ensure a shallow copy for MobX tracking
        keyExtractor={(item) => item.id}
        onDragEnd={handleDragEnd}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, drag, isActive }) => (
          <TouchableOpacity
            onLongPress={drag}
            activeOpacity={0.9}
            style={[
              styles.card,
              isActive && { opacity: 0.8, transform: [{ scale: 0.97 }] },
            ]}
          >
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
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddWish")}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
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
