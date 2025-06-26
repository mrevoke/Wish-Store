import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  Alert,
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
    <View style={styles.container}>
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

      <Button title="Save Wish" onPress={addWish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40, // <-- Top spacing to replace header
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  imagePreview: {
    height: 150,
    width: "100%",
    marginBottom: 20,
    borderRadius: 8,
  },
});
