import React, { useState, useContext } from "react";

import { StyleSheet, View, Alert } from "react-native";

import { Navbar } from "./components/Navbar";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";

export const MainLayout = () => {
  const { todos, onAddTodo, onUpdateTodo, onDeleteTodo } = useContext(TodoContext);

  const [todoId, setTodoId] = useState(null);

  const onDelete = id => {
    console.log(id);
    const todo = todos.find(t => t.id === id);
    Alert.alert(
      "Удалить задачу",
      `Вы уверены что хотите удалить задачу ${todo.title}`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            setTodoId(null);
            onDeleteTodo(id);
          }
        }
      ],
      { cancelable: false }
    );
  };

  let content = <MainScreen todos={todos} onDeleteTodo={onDelete} onAddTodo={onAddTodo} onSelect={setTodoId} />;

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    content = (
      <TodoScreen todo={selectedTodo} goBack={() => setTodoId(null)} onDeleteTodo={onDelete} onSave={onUpdateTodo} />
    );
  }

  return (
    <View>
      <Navbar title={"Todo Apps"} />
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 16
  }
});
