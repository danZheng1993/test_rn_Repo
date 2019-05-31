import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const Style = StyleSheet.create({
  container: {
    width: "80%",
    height: 26,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "#3E3E3E",
    borderRadius: 4
  },
  barContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center"
  },
  tabContainer: {},
  activeTabContainer: {
    backgroundColor: "#C2B48D"
  },
  tabText: {
    fontFamily: "CircularPro",
    fontSize: 12,
    lineHeight: 15,
    color: "#BBC2CF"
  },
  activeTabText: {
    fontFamily: "CircularPro",
    fontSize: 12,
    lineHeight: 15,
    color: "#000000"
  }
});

const TabBar = ({ value, onPress, tabs }) => (
  <View style={Style.container}>
    <View style={Style.barContainer}>
      {tabs.map(t => {
        const isActive = value === t.value;
        return (
          <TouchableOpacity onPress={() => onPress(t.value)} key={t.label}>
            <View
              style={isActive ? Style.activeTabContainer : Style.tabContainer}
            >
              <Text style={isActive ? Style.activeTabText : Style.tabText}>
                {t.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

export default TabBar;
