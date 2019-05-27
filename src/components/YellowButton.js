import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#C2B48D"
  },
  text: {
    fontFamily: "CircularPro",
    fontSize: 11,
    lineHeight: 12,
    color: "#000000"
  }
});

const YellowButton = ({ onClick, text = "GET STARTED" }) => (
  <TouchableOpacity onClick={() => onClick()}>
    <View style={Style.container}>
      <Text style={Style.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default YellowButton;
