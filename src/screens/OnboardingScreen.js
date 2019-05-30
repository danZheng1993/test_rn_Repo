/* eslint-disable no-nested-ternary */
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { YellowButton } from "../components";
import {
  getMe,
  updateMe,
  getOnboardingArtists,
  getRelatedArtists,
  artistsFollow
} from "../api";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2D"
  }
});

export default class OnboardingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={Style.container}>
        <Text>onboarding</Text>
      </View>
    );
  }
}
