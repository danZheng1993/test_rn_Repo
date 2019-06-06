import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Modal from "react-native-modal";

import SongCard from "../SongCard";
import YellowButton from "../YellowButton";
import BackArrow from "../BackArrow";

const Style = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#2D2D2D",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    paddingLeft: 16,
    paddingRight: 16
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  firstContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center"
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  spotifyContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  text: {
    fontFamily: "CircularProBook",
    fontSize: 14,
    lineHeight: 19,
    color: "#FFFFFF"
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  spotify: {}
});

const CardModal = ({
  isVisible = false,
  onRequestClose,
  song,
  user,
  navigation,
  openShareModal
}) => (
  <Modal
    isVisible={isVisible}
    onRequestClose={() => onRequestClose()}
    onBackButtonPress={() => onRequestClose()}
    useNativeDriver
    hideModalContentWhileAnimating
    coverScreen
  >
    <View style={Style.container}>
      <View style={Style.headerContainer}>
        <BackArrow onPress={() => onRequestClose()} />
        <Text style={Style.text}>Song</Text>
      </View>
      <SongCard
        song={song}
        user={user}
        navigation={navigation}
        nonInteractable
      />
      <View style={Style.firstContainer}>
        <Text style={Style.text}>1st Booster</Text>
        <Text style={Style.text}>Julie200</Text>
        {/* <Image style={Style.avatar} source={} alt="Julie200"/> */}
      </View>
      <View style={Style.buttonContainer}>
        <YellowButton
          text="VIEW ARTIST"
          onPress={() =>
            navigation.navigate("Artist", { artist: song.artist[0] })
          }
        />
        <YellowButton text="SHARE SONG" onPress={() => openShareModal()} />
      </View>
      <View style={Style.spotifyContainer}>
        <Text style={Style.text}>Listen on</Text>
        <Image
          style={Style.spotify}
          source={require("../../../assets/images/logos/spotify.png")}
          alt="Listen on Spotify"
        />
      </View>
    </View>
  </Modal>
);

export default CardModal;
