import React from "react";
import { createStackNavigator } from "react-navigation";

import {
  MainScreen,
  SignupScreen,
  LoginScreen,
  OnboardingScreen
} from "../screens";

const MainNavigator = createStackNavigator({
  Home: MainScreen,
  Signup: SignupScreen,
  Login: LoginScreen,
  Onboarding: OnboardingScreen
});

export default MainNavigator;
