import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      icon={require("../../assets/images/navbar/home.png")}
      focused={focused}
    />
  )
};

const SongsStack = createStackNavigator({
  Songs: HomeScreen
});

SongsStack.navigationOptions = {
  tabBarLabel: "Songs",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      icon={require("../../assets/images/navbar/songs.png")}
      focused={focused}
    />
  )
};

const ChatStack = createStackNavigator({
  Chat: HomeScreen
});

ChatStack.navigationOptions = {
  tabBarLabel: "Chat",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      icon={require("../../assets/images/navbar/chat.png")}
      focused={focused}
    />
  )
};

const ActivityStack = createStackNavigator({
  Activity: HomeScreen
});

ActivityStack.navigationOptions = {
  tabBarLabel: "Activity",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      icon={require("../../assets/images/navbar/activity.png")}
      focused={focused}
    />
  )
};

const SearchStack = createStackNavigator({
  Search: HomeScreen
});

SearchStack.navigationOptions = {
  tabBarLabel: "Search",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      icon={require("../../assets/images/navbar/search.png")}
      focused={focused}
    />
  )
};

export default createBottomTabNavigator(
  {
    HomeStack,
    SongsStack,
    ChatStack,
    ActivityStack,
    SearchStack
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeBackgroundColor: "#000000",
      inactiveBackgroundColor: "#000000"
    }
  }
);
