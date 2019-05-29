import React from "react";
import { Image, TouchableWithoutFeedback, StyleSheet } from "react-native";

const Style = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 8,
    width: 20,
    height: 20
  }
});

const BackArrow = ({ onPress }) => (
  <TouchableWithoutFeedback onPress={() => onPress()}>
    <Image
      source={require("../../assets/images/BackArrow/backArrow.png")}
      style={Style.icon}
    />
  </TouchableWithoutFeedback>
);

export default BackArrow;
