import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainNavigator from "./MainNavigator";
import TabNavigator from "./TabNavigator";

const AppNavigator = createAppContainer(
  createSwitchNavigator({
    Init: MainNavigator,
    Home: TabNavigator
  })
);

export default AppNavigator;
