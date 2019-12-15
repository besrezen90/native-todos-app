import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { THEME } from "../../theme";

export const AppLoading = () => {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size='large' color={THEME.MAIN_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
