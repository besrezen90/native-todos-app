import React, { useContext } from "react";

import { StyleSheet, View } from "react-native";

import { Navbar } from "./components/Navbar";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  // const onDelete = id => {
  //   const todo = todos.find(t => t.id === id);
  //   Alert.alert(
  //     "Удалить задачу",
  //     `Вы уверены что хотите удалить задачу ${todo.title}`,
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel"
  //       },
  //       {
  //         text: "OK",
  //         onPress: () => {
  //           onDeleteTodo(id);
  //         }
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  // };

  return (
    <View>
      <Navbar title={"Todo Apps"} />
      <View style={styles.container}>{todoId ? <TodoScreen /> : <MainScreen />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 16
  }
});