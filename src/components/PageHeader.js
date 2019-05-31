import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Style = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center"
  },
  title: {
    fontFamily: "CircularPro",
    fontSize: 20,
    lineHeight: 25,
    color: "#C0B491"
  },
  subtitle: {
    fontFamily: "CircularPro",
    fontSize: 14,
    lineHeight: 18,
    color: "#979797"
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12
  }
});

const PageHeader = ({ title, subtitle, user: { photo, name }, navigation }) => (
  <View style={Style.container}>
    <View style={Style.row}>
      <Text style={Style.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile", { name })}
      >
        <Image
          source={
            { uri: photo } ||
            require("../../assets/images/placeholder/placeholder.png")
          }
          style={Style.avatar}
          alt={name}
        />
      </TouchableOpacity>
    </View>
    <Text style={Style.subtitle}>{subtitle}</Text>
  </View>
);

export default PageHeader;
