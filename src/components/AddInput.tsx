import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

export const AddInput = ({ value, onChange, placeholder }: Props) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      keyboardType="numeric"
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
});
