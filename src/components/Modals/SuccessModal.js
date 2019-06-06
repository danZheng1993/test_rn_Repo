import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
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

const SuccessModal = ({ isVisible = false, onRequestClose, accept, song }) => (
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
        <Text style={Style.text}>{`Success`}</Text>
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
      </View>
    </View>
  </Modal>
);

export default SuccessModal;
