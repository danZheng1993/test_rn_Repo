import React from "react";
import { Image, TouchableWithoutFeedback, StyleSheet } from "react-native";

const Style = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  }
});

const TabBarIcon = ({ onPress }) => (
  <TouchableWithoutFeedback onPress={() => onPress()}>
    <Image
      source={require("../../assets/images/BackArrow/backArrow.png")}
      style={Style.icon}
    />
  </TouchableWithoutFeedback>
);

export default TabBarIcon;
