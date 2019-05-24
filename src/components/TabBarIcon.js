import React from "react";
import { Image, View, StyleSheet } from "react-native";

const Style = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  dot: {
    position: "absolute",
    bottom: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C2B48D"
  }
});

const TabBarIcon = ({ icon, focused }) => (
  <View style={Style.container}>
    <Image source={icon} style={Style.icon} />
    {focused && <View style={Style.dot} />}
  </View>
);

export default TabBarIcon;
