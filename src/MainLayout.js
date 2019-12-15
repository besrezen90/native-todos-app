import React, { useContext } from "react";

import { StyleSheet, View } from "react-native";

import { Navbar } from "./components/Navbar";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View style={styles.wrap}>
      <Navbar title={"Todo Apps"} />
      <View style={styles.container}>{todoId ? <TodoScreen /> : <MainScreen />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 8,
    marginBottom: 16
  }
});
