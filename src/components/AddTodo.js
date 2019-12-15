import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { THEME } from "../theme";

export const AddTodo = ({ onAddTodo }) => {
  const [todoName, setTodoName] = useState("");

  const onPress = () => {
    if (!todoName.trim().length) {
      Alert.alert("Название задачи не может быть пустым!");
    } else {
      onAddTodo(todoName.trim());
      setTodoName("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.body}>
      <TextInput
        style={styles.input}
        value={todoName}
        onChangeText={setTodoName}
        placeholder='Введите название задачи...'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <AntDesign.Button onPress={onPress} name='pluscircleo'>
        Добавить
      </AntDesign.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 20
  },
  input: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "60%"
  }
});
