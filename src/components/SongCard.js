/* eslint-disable no-nested-ternary */
import React from "react";
import { Audio } from "expo";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import MarqueeText from "react-native-marquee";

import YellowButton from "./YellowButton";
import { formatNum } from "../utils";

const Style = StyleSheet.create({
  container: {
    height: 242,
    width: 141,
    backgroundColor: "#3E3E3E",
    borderRadius: 5
  },
  priceContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 8,
    height: 22,
    minWidth: 50,
    maxWidth: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
    zIndex: 2
  },
  playContainer: {
    width: 20,
    position: "absolute",
    top: "20%",
    left: "45%",
    zIndex: 2
  },
  contentContainer: {
    maxHeight: "100%",
    maxWidth: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 8
  },
  ownerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center"
  },
  belongsContainer: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  text: {
    fontFamily: "CircularProBook",
    fontSize: 10,
    lineHeight: 19,
    color: "#FFFFFF"
  },
  songNameText: {
    fontFamily: "CircularPro",
    fontSize: 14,
    lineHeight: 25
  },
  artistNameText: {
    fontSize: 14,
    lineHeight: 25,
    color: "#C0B491"
  },
  ownerText: {
    fontFamily: "CircularPro",
    fontSize: 12
  },
  coinText: {
    fontFamily: "CircularProBold",
    fontSize: 15
  },
  album: {
    height: 100,
    width: 141,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  ownerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8
  },
  coinStack: {
    width: 16,
    height: 16,
    marginRight: 4
  },
  play: {
    width: 20
  }
});

class SongCard extends React.Component {
  state = {
    showBuyModal: false,
    showShareModal: false,
    isPlaying: false,
    soundObject: null
  };

  togglePlaying = async () => {
    const { isPlaying } = this.state;

    if (isPlaying) {
      await this.stopSong();
      return;
    }
    await this.playSong();
  };

  playSong = async () => {
    const { song } = this.props;
    const soundObject = new Audio.Sound();
    soundObject.setOnPlaybackStatusUpdate(this.updatePlayStatus);
    soundObject.setProgressUpdateIntervalAsync(500);
    this.setState({ soundObject });
    try {
      await soundObject.loadAsync({ uri: song.preview_url });
      await soundObject.playAsync();
      this.setState({ isPlaying: true });
    } catch (error) {
      console.log(error);
    }
  };

  stopSong = async () => {
    const { soundObject } = this.state;
    soundObject.setOnPlaybackStatusUpdate(null);
    try {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      this.setState({ isPlaying: false, soundObject: null });
    } catch (error) {
      console.log(error);
    }
  };

  updatePlayStatus = async e => {
    if (e.isLoaded && e.didJustFinish) {
      await this.stopSong();
    }
  };

  openBuyModal = () => this.setState({ showBuyModal: true });
  closeBuyModal = () => this.setState({ showBuyModal: false });

  openShareModal = () => this.setState({ showShareModal: true });
  closeShareModal = () => this.setState({ showShareModal: false });

  goToProfile = id => {
    const { navigation } = this.props;
    navigation.navigate("Profile", { id });
  };

  goToCardPage = id => {
    const { navigation } = this.props;
    navigation.navigate("Card", { id });
  };

  render() {
    const { song, user } = this.props;
    const { showBuyModal, showShareModal, isPlaying } = this.state;
    const isOwner = Number(song.user.id) === user.user_id;
    return (
      <TouchableWithoutFeedback onPress={() => this.goToCardPage(song.id)}>
        <View style={Style.container}>
          <View style={Style.priceContainer}>
            <Image
              source={require("../../assets/images/coins/coinStack.png")}
              alt="coin stack"
              style={Style.coinStack}
            />
            <Text style={[Style.text, Style.coinText]}>
              {formatNum(song.price_value)}
            </Text>
          </View>
          {song.preview_url ? (
            <TouchableWithoutFeedback onPress={() => this.togglePlaying()}>
              <View style={Style.playContainer}>
                <Image
                  source={
                    isPlaying
                      ? require("../../assets/images/controls/pause.png")
                      : require("../../assets/images/controls/play.png")
                  }
                  alt="play"
                  style={Style.play}
                />
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <React.Fragment />
          )}
          <Image
            source={{ uri: song.album.images[0].url }}
            alt={song.name}
            style={Style.album}
            resizeMode="cover"
          />
          <View style={Style.contentContainer}>
            <MarqueeText
              style={[Style.text, Style.songNameText]}
              duration={3000}
              marqueeOnStart
              loop
              useNativeDriver
            >
              {song.name}
            </MarqueeText>
            <MarqueeText
              style={[Style.text, Style.artistNameText]}
              duration={3000}
              marqueeOnStart
              loop
              useNativeDriver
            >
              {song.artists[0].name}
            </MarqueeText>
            <TouchableWithoutFeedback
              onPress={() => this.goToProfile(song.user.id)}
            >
              <View style={Style.ownerContainer}>
                <Image
                  source={{
                    uri:
                      song.user.thumbnail_url !== null
                        ? song.user.thumbnail_url
                        : require("../../assets/images/placeholder/placeholder.png")
                  }}
                  alt={song.user.username}
                  style={Style.ownerAvatar}
                />
                <View style={Style.belongsContainer}>
                  <Text style={Style.text}>BELONGS TO</Text>
                  <Text style={[Style.text, Style.ownerText]}>
                    {song.user
                      ? isOwner
                        ? `YOU`
                        : song.user.username
                      : `NO ONE`}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <YellowButton
              text={isOwner ? `SHARE` : "BOOST"}
              width="100%"
              height={30}
              marginRight={0}
              marginLeft={0}
              onPress={
                isOwner
                  ? () => this.openShareModal()
                  : () => this.openBuyModal()
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SongCard;
