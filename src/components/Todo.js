import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "./ui/AppText";

export const Todo = ({ todo, onDeleteTodo, onSelect }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onSelect(todo.id)} onLongPress={() => onDeleteTodo(todo.id)}>
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
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
