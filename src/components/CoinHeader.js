import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";

import { formatNum } from "../utils";

const Style = StyleSheet.create({
  container: {
    width: "100%",
    height: 24,
    position: "absolute",
    top: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#232323",
    paddingTop: 8,
    paddingBottom: 8
  },
  text: {
    fontFamily: "CircularPro",
    fontSize: 13,
    lineHeight: 16,
    color: "#FFFFFF"
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 8
  }
});

class CoinHeader extends React.Component {
  state = { showModal: false };

  render() {
    const {
      user: { coins }
    } = this.props;
    const { showModal } = this.state;
    // TODO: Create and show purchase modal
    return (
      <TouchableWithoutFeedback
        onPress={() => this.setState({ showModal: true })}
      >
        <View style={Style.container}>
          <Image
            style={Style.icon}
            source={require("../../assets/images/coins/coin.png")}
            alt="coin"
          />
          <Text style={Style.text}>{formatNum(coins)}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
export default CoinHeader;
