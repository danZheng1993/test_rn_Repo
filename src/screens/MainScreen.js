import React from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
import { YellowButton } from "../components";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A90404"
  },
  headerIcon: {},
  headerText: {},
  logoText: {},
  logoSubtext: {}
});

export default class MainScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = { activeTab: "signup" };

  goToLogin = type => {
    const { navigation } = this.props;
    navigation.navigate("Login", { type });
  };

  openInstaLink = async () => {
    const username = `Zion.app`;
    const url = `intent://instagram.com/_u/${username}/#Intent;package=com.instagram.android;scheme=https;end`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      return Linking.openURL(url);
    }
  };

  render() {
    const { navigation } = this.props;
    const { activeTab } = this.state;
    return (
      <View style={Style.container}>
        <View style={Style.header}>
          <Image
            source={require("../../assets/images/social/insta-white.png")}
            style={Style.headerIcon}
            onPress={() => this.openInstaLink()}
          />
          <Text style={Style.headerText}>LOG IN</Text>
          <Text style={Style.headerText}>JOIN US</Text>
        </View>
        <Text style={Style.logoText}>Zion</Text>
        <Text style={Style.logoSubtext}>A NEW FUTURE</Text>
        <YellowButton
          text="GET STARTED"
          onClick={() => navigation.navigate("Signup")}
        />
      </View>
    );
  }
}
