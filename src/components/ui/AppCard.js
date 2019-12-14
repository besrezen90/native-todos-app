import React from "react";
import { StyleSheet, View } from "react-native";

export const AppCard = ({ style, children }) => {
  return <View style={{ ...styles.default, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  default: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 }
  }
});
