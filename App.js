import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/context/todo/TodoState";

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

  if (!isReady) {
    return <AppLoading startAsync={loadApp} onError={console.warn} onFinish={() => setIsReady(true)} />;
  }

  return (
    <TodoState>
      <MainLayout />
    </TodoState>
  );
}
