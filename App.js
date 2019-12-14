import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState("2");
  const [todos, setTodos] = useState([
    { id: "1", title: "Test 1" },
    { id: "2", title: "Test 2" }
  ]);

  const onAddTodo = title => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  };

  const onDeleteTodo = id => {
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
            setTodos(prev => prev.filter(todo => todo.id !== id));
          }
        }
      ],
      { cancelable: false }
    );
  };

  let content = <MainScreen todos={todos} onDeleteTodo={onDeleteTodo} onAddTodo={onAddTodo} onSelect={setTodoId} />;

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    content = <TodoScreen todo={selectedTodo} goBack={() => setTodoId(null)} onDeleteTodo={onDeleteTodo} />;
  }

  return (
    <View>
      <Navbar title={"Todo Apps"} />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 16
  }
});
