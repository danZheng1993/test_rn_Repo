import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D2D2D"
  }
});

const LoadingIndicator = () => (
  <View style={Style.container}>
    <ActivityIndicator size="large" color="#C2B48D" />
  </View>
);

export default LoadingIndicator;
