import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const Style = StyleSheet.create({
  container: {
    width: "80%",
    height: 44,
    maxHeight: 44,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#3E3E3E",
    borderRadius: 4
  },
  barContainer: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  tabContainer: {
    width: "100%",
    height: 44,
    borderRadius: 4,
    padding: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
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
              style={
                isActive
                  ? [Style.tabContainer, Style.activeTabContainer]
                  : Style.tabContainer
              }
            >
              <Text
                style={
                  isActive
                    ? [Style.tabText, Style.activeTabText]
                    : Style.tabText
                }
              >
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
