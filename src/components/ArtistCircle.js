import React from "react";
import {
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text
} from "react-native";

const Style = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: 8
  },
  artistContainer: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  selectedArtistContainer: {
    position: "absolute",
    top: -5,
    left: -5,
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 10,
    borderColor: "#C2B48D"
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  name: {
    fontFamily: "GothamBook",
    fontSize: 14,
    color: "#ffffff",
    marginTop: 8
  }
});

class ArtistCircle extends React.PureComponent {
  state = { selected: false };

  render() {
    const { artist, onClick } = this.props;
    const { selected } = this.state;
    const uri = artist.images[artist.images.length - 1].url;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ selected: !selected });
          onClick(artist);
        }}
      >
        <View style={Style.container}>
          <View style={Style.artistContainer}>
            {selected && <View style={Style.selectedArtistContainer} />}
            <Image
              style={Style.img}
              source={
                { uri } ||
                require("../../assets/images/placeholder/placeholder.png")
              }
              alt={artist.name}
            />
          </View>
          <Text style={Style.name}>{artist.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ArtistCircle;
