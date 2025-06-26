import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react-lite";
import { wishStore } from "../stores/WishStore";
import { useNavigation } from "@react-navigation/native";
import { observable } from "mobx";
export const HomeScreen = observer(() => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <FlatList
        data={wishStore.wishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.note}</Text>
            {item.address && (
              <Text style={styles.address}>📍 {item.address}</Text>
            )}
            {item.imageUri && (
              <Image source={{ uri: item.imageUri }} style={styles.image} />
            )}
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 40, // <-- Top spacing after removing header
  },
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  address: { fontStyle: "italic", marginTop: 5 },
  image: {
    height: 150,
    width: "100%",
    marginTop: 10,
    borderRadius: 8,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    fontSize: 32,
    color: "#fff",
    lineHeight: 36,
    fontWeight: "bold",
  },
});
