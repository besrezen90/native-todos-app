import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";

export const MainScreen = ({ todos, onAddTodo, onDeleteTodo, onSelect }) => {
  return (
    <View>
      <AddTodo onAddTodo={onAddTodo} />

      <FlatList
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({ item }) => <Todo key={item.id} todo={item} onDeleteTodo={onDeleteTodo} onSelect={onSelect} />}
        style={styles.todos}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todos: {
    padding: 8
  }
});
