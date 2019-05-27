import React from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
import { YellowButton } from "../components";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A90404",
    padding: 20
  },
  header: {
    width: "100%",
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  },
  headerIcon: {
    width: 20,
    height: 20
  },
  headerText: {
    fontFamily: "CircularPro",
    fontSize: 13,
    color: "#FFFFFF"
  },
  logoText: {
    fontFamily: "SangBleuBold",
    fontSize: 49,
    color: "#C2B48D"
  },
  logoSubtext: {
    fontFamily: "CircularPro",
    fontSize: 15,
    color: "#C2B48D"
  }
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
          <View style={Style.tabContainer}>
            <Text
              style={[
                Style.headerText,
                activeTab === "login" ? { borderBottom: "1px solid white" } : {}
              ]}
            >
              LOG IN
            </Text>
            <Text
              style={[
                Style.headerText,
                activeTab === "signup"
                  ? { borderBottom: "1px solid white" }
                  : {}
              ]}
            >
              JOIN US
            </Text>
          </View>
        </View>
        <Text style={Style.logoText}>Zion</Text>
        <Text style={Style.logoSubtext}>A NEW FUTURE</Text>
        <YellowButton
          text="GET STARTED"
          onPress={() => navigation.navigate("Signup")}
          width={110}
          height={36}
        />
      </View>
    );
  }
}
