import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Navbar } from "./src/Navbar";
import { AddTodo } from "./src/AddTodo";
import { Todo } from "./src/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);

  const onAddTodo = title => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  };

  return (
    <View>
      <Navbar title={"Todo Apps"} />
      <View style={styles.container}>
        <AddTodo onAddTodo={onAddTodo} />
      </View>
      <View style={styles.todos}>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 16
  },
  todos: {
    padding: 8
  }
});
