import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Style = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#C2B48D"
  },
  text: {
    fontFamily: "CircularProBold",
    fontSize: 14,
    lineHeight: 12,
    color: "#000000"
  }
});

const YellowButton = ({
  onPress,
  text = "GET STARTED",
  width,
  height,
  margin
}) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View
      style={[
        Style.container,
        { width: width || 110, height: height || 36, margin: margin || 8 }
      ]}
    >
      <Text style={Style.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default YellowButton;
