import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

//FIXME: подключение шрифтов временно не работает
const loadApp = async () => {
  try {
    await Font.loadAsync({
      "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf")
    });
  } finally {
    console.log("Roboto is loaded:" + Font.isLoaded("roboto-regular"));
  }
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([{ id: "1", title: "Test 1" }]);

  if (!isReady) {
    return <AppLoading startAsync={loadApp} onError={console.warn} onFinish={() => setIsReady(true)} />;
  }

  const onAddTodo = title => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  };

  const onSave = (id, title) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { id, title };
      } else return todo;
    });
    setTodos([...newTodos]);
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
    content = (
      <TodoScreen todo={selectedTodo} goBack={() => setTodoId(null)} onDeleteTodo={onDeleteTodo} onSave={onSave} />
    );
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
