import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";
import Modal from "react-native-modal";

import { formatNum } from "../../utils";

const Style = StyleSheet.create({
  container: {
    height: 300,
    width: "120%",
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "-3deg" }]
  },
  contentContainer: {
    height: 300,
    width: "70%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  text: {
    fontFamily: "GothamBook",
    fontSize: 18,
    color: "#484848"
  },
  buttonContainer: {
    height: 300,
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  loadingContainer: {
    height: 300,
    width: "70%",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  icon: {
    height: 30
  }
});

// TODO: Optimize when animation starts

const SongBuyModal = ({
  isVisible = false,
  onRequestClose,
  accept,
  song,
  isCollecting = false,
  price
}) => {
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    })
  ).start();
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <Modal
      isVisible={isVisible}
      onRequestClose={() => onRequestClose()}
      onBackButtonPress={() => onRequestClose()}
      onBackdropPress={() => onRequestClose()}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={Style.container}>
        <View style={Style.contentContainer}>
          <Text style={Style.text}>
            {isCollecting
              ? `Attempting to boost...`
              : `Collect ${song.name} by ${
                  song.artists[0].name
                } for ${formatNum(price)}?`}
          </Text>
          {isCollecting ? (
            <View style={Style.loadingContainer}>
              <Animated.Image
                style={[Style.icon, { transform: [{ rotate }] }]}
                source={require("../../../assets/images/loading/loading.png")}
                alt="loading"
              />
            </View>
          ) : (
            <View style={Style.buttonContainer}>
              <TouchableOpacity onPress={() => onRequestClose()}>
                <Image
                  style={Style.icon}
                  source={require("../../../assets/images/controls/x.png")}
                  alt="exit"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => accept()}>
                <Image
                  style={Style.icon}
                  source={require("../../../assets/images/controls/checkmark.png")}
                  alt="accept"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SongBuyModal;
