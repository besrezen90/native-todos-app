import React, { useContext, useCallback, useEffect } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";

import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";
import { AppLoading } from "../components/ui/AppLoading";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";
import { THEME } from "../theme";

export const MainScreen = () => {
  const { todos, onAddTodo, onDeleteTodo, fetchData, loading, error } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);

  const onLoadData = useCallback(async () => fetchData(), [fetchData]);

  useEffect(() => {
    onLoadData();
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={onLoadData}>Повторить</AppButton>
      </View>
    );
  }

  return (
    <View style={styles.todos}>
      <AddTodo onAddTodo={onAddTodo} />

      {todos.length ? (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={todos}
          renderItem={({ item }) => (
            <Todo key={item.id} todo={item} onDeleteTodo={onDeleteTodo} onSelect={changeScreen} />
          )}
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
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  }
});
