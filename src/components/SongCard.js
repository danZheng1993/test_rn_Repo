/* eslint-disable no-nested-ternary */
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback
} from "react-native";

import YellowButton from "./YellowButton";
import { formatNum } from "../utils";

const Style = StyleSheet.create({
  container: {
    height: 222,
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
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center"
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center"
  },
  ownerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center"
  },
  belongsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center"
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
    fontSize: 12,
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
    width: 141
  },
  ownerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  coinStack: {
    width: 21,
    height: 21
  }
});

class SongCard extends React.Component {
  state = {
    showBuyModal: false,
    showShareModal: false
  };

  openBuyModal = () => this.setState({ showBuyModal: true });
  closeBuyModal = () => this.setState({ showBuyModal: false });

  openShareModal = () => this.setState({ showShareModal: true });
  closeShareModal = () => this.setState({ showShareModal: false });

  render() {
    const { song, user } = this.props;
    const { showBuyModal, showShareModal } = this.state;
    const isOwner = Number(song.user.id) === user.user_id;
    return (
      <TouchableWithoutFeedback
        onPress={
          isOwner ? () => this.openShareModal() : () => this.openBuyModal()
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
              {formatNum(user.coins)}
            </Text>
          </View>
          <Image
            source={{ uri: song.album.images[0].url }}
            alt={song.name}
            style={Style.album}
            resizeMode="cover"
          />
          <View style={Style.contentContainer}>
            <Text style={[Style.text, Style.songNameText]}>{song.name}</Text>
            <Text style={[Style.text, Style.artistNameText]}>
              {song.artists[0].name}
            </Text>
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
            <YellowButton
              text={isOwner ? `SHARE` : "BOOST"}
              width={127}
              height={25}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SongCard;
