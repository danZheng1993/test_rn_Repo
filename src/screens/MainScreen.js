import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableWithoutFeedback
} from "react-native";
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
    color: "#FFFFFF",
    marginRight: 8
  },
  headerTextActive: {
    borderBottomWidth: 1,
    borderColor: "#FFFFFF"
  },
  logoText: {
    fontFamily: "SangBleuBold",
    fontSize: 49,
    color: "#C2B48D",
    margin: 8
  },
  logoSubtext: {
    fontFamily: "CircularPro",
    fontSize: 15,
    color: "#C2B48D",
    margin: 8
  },
  content: {
    width: "100%",
    height: "80%",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
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
          <TouchableWithoutFeedback onPress={() => this.openInstaLink()}>
            <Image
              source={require("../../assets/images/social/insta-white.png")}
              style={Style.headerIcon}
            />
          </TouchableWithoutFeedback>
          <View style={Style.tabContainer}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ activeTab: "login" })}
            >
              <Text
                style={
                  activeTab === "login"
                    ? [Style.headerText, Style.headerTextActive]
                    : Style.headerText
                }
              >
                LOG IN
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ activeTab: "signup" })}
            >
              <Text
                style={
                  activeTab === "signup"
                    ? [Style.headerText, Style.headerTextActive]
                    : Style.headerText
                }
              >
                JOIN US
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={Style.content}>
          <Text style={Style.logoText}>Zion</Text>
          <Text style={Style.logoSubtext}>A NEW FUTURE</Text>
          {activeTab === "signup" ? (
            <YellowButton
              text="GET STARTED"
              onPress={() => navigation.navigate("Signup")}
              width={110}
              height={36}
            />
          ) : (
            <React.Fragment>
              <YellowButton
                text="PHONE"
                onPress={() => this.goToLogin("phone")}
              />
              <YellowButton
                text="EMAIL"
                onPress={() => this.goToLogin("email")}
              />
              <YellowButton
                text="USERNAME"
                onPress={() => this.goToLogin("username")}
              />
            </React.Fragment>
          )}
        </View>
      </View>
    );
  }
}
