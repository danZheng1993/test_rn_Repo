/* eslint-disable no-nested-ternary */
import React from "react";
import { Audio } from "expo-av";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import MarqueeText from "react-native-marquee";

import { formatNum } from "../utils";
import { stealSong, earningToCoins } from "../api";

import YellowButton from "./YellowButton";
import SongBuyModal from "./Modals/SongBuyModal";
import SuccessModal from "./Modals/SuccessModal";
import ShareModal from "./Modals/ShareModal";
import CardModal from "./Modals/CardModal";

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
  earningContainer: {},
  coinStackContainer: {},
  earningFooter: {},
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
  earningsText: {},
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
  blackCoin: {},
  earning: {},
  play: {
    width: 20
  }
});

// TODO: earnings design

class SongCard extends React.Component {
  state = {
    showBuyModal: false,
    showSuccessModal: false,
    showShareModal: false,
    showCardModal: false,
    notEnoughCoins: false,
    isPlaying: false,
    isCollecting: false,
    isOwner: false,
    soundObject: null,
    price: this.props.song.price_value,
    earnings: []
  };

  componentDidMount = async () => {
    this.updateEarnings();
  };

  updateEarnings = async () => {
    const {
      song,
      song: { user_earnings },
      config: { price_decrease_threshold },
      user
    } = this.props;
    const { price } = this.state;

    if (price > Number(price_decrease_threshold)) {
      this.startTimer();
    }
    const myEarnings = [];
    let isOwner = false;
    if (song.user) {
      isOwner = Number(song.user.id) === user.user_id;
      if (user_earnings) {
        await user_earnings.forEach(e => {
          if (user.user_id === Number(e.user_id) && !Number(e.is_converted)) {
            myEarnings.push(e);
          }
        });
      }
    }
    this.setState({
      earnings: myEarnings,
      isOwner
    });
  };

  startTimer = async () => {
    const interval = Math.floor(Math.random() * 7 + 1);

    setTimeout(() => {
      this.decrementPrice(interval);
      this.startTimer();
    }, interval * 1000);
  };

  decrementPrice = async intervals => {
    const { price } = this.state;
    const newPrice = price - intervals;
    this.setState({
      price: newPrice.toString()
    });
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

  openSuccessModal = () => this.setState({ showSuccessModal: true });
  closeSuccessModal = () => this.setState({ showSuccessModal: false });

  openShareModal = () =>
    this.setState({ showSuccessModal: false, showShareModal: true });
  closeShareModal = () => this.setState({ showShareModal: false });

  openCardModal = () => this.setState({ showCardModal: true });
  closeCardModal = () => this.setState({ showCardModal: false });

  openPurchaseModal = () => this.setState({ showPurchaseModal: true });
  closePurchaseModal = () => this.setState({ showPurchaseModal: false });

  goToProfile = id => {
    const { navigation } = this.props;
    console.log("going to profile: ", id);
    navigation.navigate("Profile", { id });
  };

  goToCardPage = id => {
    console.log("going to card: ", id);
    this.setState({
      showCardModal: true
    });
  };

  openFirstBoosterProfile = () => {
    // TODO: Implement, awaiting back end changed
  };

  collectCard = async () => {
    const { song, user } = this.props;
    const { price } = this.state;

    try {
      this.setState({
        isCollecting: true
      });
      if (parseInt(price, 10) > parseInt(user.coins, 10)) {
        await this.setState({ isCollecting: false, notEnoughCoins: true });
        return;
      }
      await stealSong(song.id);
      this.setState({
        isOwner: true,
        isCollecting: false,
        showBuyModal: false,
        showSuccessModal: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  collectEarning = async (e, earning) => {
    const { earnings } = this.state;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    const res = await earningToCoins(earning.id);
    if (res.data.coins) {
      const tempEarnings = earnings.slice();
      tempEarnings.shift();
      this.setState({ earnings: tempEarnings });
    } else {
      console.error(res);
    }
  };

  render() {
    const {
      song,
      navigation,
      user,
      nonInteractable = false,
      config
    } = this.props;
    const {
      showBuyModal,
      showShareModal,
      showSuccessModal,
      showCardModal,
      isPlaying,
      isCollecting,
      isOwner,
      price,
      earnings,
      notEnoughCoins
    } = this.state;
    return (
      <React.Fragment>
        <SongBuyModal
          isVisible={showBuyModal}
          onRequestClose={this.closeBuyModal}
          accept={notEnoughCoins ? this.openPurchaseModal : this.collectCard}
          song={song}
          isCollecting={isCollecting}
          price={price}
          notEnoughCoins={notEnoughCoins}
        />
        <SuccessModal
          isVisible={showSuccessModal}
          onRequestClose={this.closeSuccessModal}
          accept={this.openShareModal}
          song={song}
        />
        <ShareModal
          isVisible={showShareModal}
          onRequestClose={this.closeShareModal}
          song={song}
        />
        {!nonInteractable && (
          <CardModal
            isVisible={showCardModal}
            onRequestClose={this.closeCardModal}
            song={song}
            user={user}
            navigation={navigation}
            openShareModal={this.openShareModal}
            openFirstBoosterProfile={this.openFirstBoosterProfile}
            config={config}
          />
        )}
        <TouchableWithoutFeedback
          onPress={
            nonInteractable ? () => {} : () => this.goToCardPage(song.id)
          }
        >
          <View style={Style.container}>
            <View style={Style.priceContainer}>
              <Image
                source={require("../../assets/images/coins/coinStack.png")}
                alt="coin stack"
                style={Style.coinStack}
              />
              <Text style={[Style.text, Style.coinText]}>
                {formatNum(price)}
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
                    source={
                      song.user
                        ? song.user.thumbnail_url
                          ? {
                              uri: song.user.thumbnail_url
                            }
                          : require("../../assets/images/placeholder/placeholder.png")
                        : require("../../assets/images/placeholder/placeholder.png")
                    }
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
              {earnings.length > 0 && (
                <TouchableWithoutFeedback
                  onPress={e => this.collectEarning(e, earnings[0])}
                >
                  <View style={Style.earningContainer}>
                    <View style={Style.earningFooter}>
                      <Text style={[Style.text, Style.earningsText]}>
                        GET EARNINGS
                      </Text>
                      <Image
                        style={Style.blackCoin}
                        src={require("../../assets/images/coins/blackCoins.png")}
                        alt="earningCoin"
                      />
                      <Text style={[Style.text, Style.earningsText]}>
                        {formatNum(earnings[0].amount)}
                      </Text>
                    </View>
                  </View>
                  <View style={Style.coinStackContainer}>
                    <Image
                      style={Style.earning}
                      src={require("../../assets/images/coins/earningsStack.png")}
                      alt="Stack of coins"
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </React.Fragment>
    );
  }
}

export default SongCard;
