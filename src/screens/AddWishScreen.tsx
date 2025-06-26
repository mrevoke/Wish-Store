import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { wishStore } from "../stores/WishStore";
import { useNavigation } from "@react-navigation/native";

export const AddWishScreen = () => {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [imageUri, setImageUri] = useState<string | undefined>();
  const navigation = useNavigation<any>();

  const addWish = () => {
    if (!address.trim()) return Alert.alert("Please enter an address");

    wishStore.addWish({
      id: uuidv4(),
      name,
      note,
      imageUri,
      address,
    });

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Add a New Wish</Text>

        <TextInput
          placeholder="Place name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Note"
          value={note}
          onChangeText={setNote}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <TextInput
          placeholder="Image URL"
          value={imageUri}
          onChangeText={setImageUri}
          style={styles.input}
        />

        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : null}

        <TouchableOpacity onPress={addWish} style={styles.button}>
          <Text style={styles.buttonText}>Save Wish</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 8,
    paddingTop: 36,
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
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
