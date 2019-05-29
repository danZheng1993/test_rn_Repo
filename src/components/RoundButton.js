import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Style = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#b3b3b3"
  },
  text: {
    fontFamily: "CircularProBook",
    fontSize: 12,
    lineHeight: 12,
    color: "#ffffff",
    padding: 4
  }
});

const RoundButton = ({
  onPress,
  text = "GET STARTED",
  width,
  height,
  margin,
  fontSize
}) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View
      style={[
        Style.container,
        {
          width: width || 110,
          height: height || 36,
          margin: margin || 8,
          borderRadius: width / 4 || 110 / 4
        }
      ]}
    >
      <Text
        style={[
          Style.text,
          {
            fontSize: fontSize || 12
          }
        ]}
      >
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

export default RoundButton;
