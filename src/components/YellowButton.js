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
    fontSize: 12,
    lineHeight: 12,
    color: "#000000"
  },
  disabledContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#BFBFBF"
  },
  disabledText: {
    fontFamily: "CircularProBold",
    fontSize: 12,
    lineHeight: 12,
    color: "#484848"
  }
});

const YellowButton = ({
  onPress,
  text = "GET STARTED",
  width,
  height,
  margin,
  disabled = false
}) => (
  <TouchableOpacity onPress={disabled ? () => {} : () => onPress()}>
    <View
      style={
        disabled
          ? [
              Style.disabledContainer,
              {
                width: width || 110,
                height: height || 36,
                margin: margin || 8
              }
            ]
          : [
              Style.container,
              {
                width: width || 110,
                height: height || 36,
                margin: margin || 8
              }
            ]
      }
    >
      <Text style={disabled ? Style.disabledText : Style.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default YellowButton;
