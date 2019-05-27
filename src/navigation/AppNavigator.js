import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainNavigator from "./MainNavigator";
import TabNavigator from "./TabNavigator";

const AppNavigator = createAppContainer(
  createSwitchNavigator({
    Main: MainNavigator,
    Home: TabNavigator
  })
);

export default AppNavigator;
