import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon, Constants, Amplitude } from "expo";
import Sentry from "sentry-expo";
import { AppNavigator } from "./src/navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {
    // Sentry.enableInExpoDevelopment = true;
    Sentry.config(Constants.manifest.extra.sentryDSN).install();
    /* Amplitude.initialize(Constants.manifest.extra.amplitudeApiKey);
    Amplitude.logEvent("test"); */
  }

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require("./assets/images/navbar/activity.png"),
        require("./assets/images/navbar/chat.png"),
        require("./assets/images/navbar/home.png"),
        require("./assets/images/navbar/search.png"),
        require("./assets/images/navbar/songs.png"),
        require("./assets/images/social/insta-white.png"),
        require("./assets/images/BackArrow/backArrow.png")
      ]),
      Font.loadAsync({
        CircularPro: require("./assets/fonts/CircularPro-Medium.otf"),
        CircularProBold: require("./assets/fonts/CircularPro-Bold.otf"),
        CircularProBook: require("./assets/fonts/CircularPro-Book.otf"),
        Gotham: require("./assets/fonts/GothamRounded-Medium.otf"),
        GothamBold: require("./assets/fonts/GothamRounded-Bold.otf"),
        GothamBook: require("./assets/fonts/GothamRounded-Book.otf"),
        GothamLight: require("./assets/fonts/GothamRounded-Light.otf"),
        SangBleuBlack: require("./assets/fonts/SangBleuEmpire-Black-WebTrial.ttf"),
        SangBleuBold: require("./assets/fonts/SangBleuEmpire-Bold-WebTrial.ttf")
      })
    ]);

  handleLoadingError = err => {
    console.warn(err);
    Sentry.captureException(err);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}
