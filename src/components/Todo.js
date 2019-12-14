import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export const Todo = ({ todo, onDeleteTodo, onSelect }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onSelect(todo.id)} onLongPress={() => onDeleteTodo(todo.id)}>
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
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
