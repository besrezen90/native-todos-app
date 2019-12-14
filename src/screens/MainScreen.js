import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";

import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";

export const MainScreen = ({ todos, onAddTodo, onDeleteTodo, onSelect }) => {
  return (
    <View style={styles.todos}>
      <AddTodo onAddTodo={onAddTodo} />

      {todos.length ? (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={todos}
          renderItem={({ item }) => <Todo key={item.id} todo={item} onDeleteTodo={onDeleteTodo} onSelect={onSelect} />}
        />
      ) : (
        <View style={styles.imageWrap}>
          <Image source={require("../../assets/no-items.png")} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  todos: {
    padding: 8
  },
  imageWrap: {
    marginTop: 20,
    height: 300
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});
