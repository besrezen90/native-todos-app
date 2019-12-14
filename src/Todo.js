import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const Todo = ({ todo }) => {
  return (
    <View style={styles.todo}>
      <Text>{todo.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 8,
    borderColor: "gray",
    borderWidth: 2
  }
});
