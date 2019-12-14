import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { THEME } from "../theme";

export const AddTodo = ({ onAddTodo }) => {
  const [todoName, setTodoName] = useState("");

  const onPress = () => {
    if (!todoName.trim().length) {
      Alert.alert("Название задачи не может быть пустым!");
    } else {
      onAddTodo(todoName.trim());
      setTodoName("");
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
      <Button title='Добавить' onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  input: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "70%"
  }
});
