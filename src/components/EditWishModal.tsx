// components/EditWishModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export const EditWishModal = ({
  visible,
  wish,
  setWish,
  onSave,
  onCancel,
}: {
  visible: boolean;
  wish: any;
  setWish: (data: any) => void;
  onSave: () => void;
  onCancel: () => void;
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Edit Wish</Text>

            <TextInput
              placeholder="Place name"
              value={wish?.name}
              onChangeText={(text) => setWish({ ...wish, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Note"
              value={wish?.note}
              onChangeText={(text) => setWish({ ...wish, note: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Address"
              value={wish?.address}
              onChangeText={(text) => setWish({ ...wish, address: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Image URL"
              value={wish?.imageUri}
              onChangeText={(text) => setWish({ ...wish, imageUri: text })}
              style={styles.input}
            />
            {wish?.imageUri ? (
              <Image source={{ uri: wish.imageUri }} style={styles.imagePreview} />
            ) : null}

            <TouchableOpacity onPress={onSave} style={styles.button}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onCancel} style={[styles.button, { backgroundColor: "#999", marginTop: 10 }]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  title: {
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
