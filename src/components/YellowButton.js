import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#C2B48D"
  },
  text: {
    fontFamily: "CircularProBold",
    fontSize: 11,
    lineHeight: 12,
    color: "#000000"
  }
});

const YellowButton = ({
  onPress,
  text = "GET STARTED",
  width = 110,
  height = 36
}) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View style={[Style.container, { width, height }]}>
      <Text style={Style.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default YellowButton;
