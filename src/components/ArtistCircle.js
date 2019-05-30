import React from "react";
import {
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text
} from "react-native";

const Style = StyleSheet.create({
  artistContainer: {
    width: 50,
    height: 50,
    margin: 20,
    borderRadius: 25
  },
  selectedArtistContainer: {
    borderWidth: 10,
    borderColor: "#C2B48D"
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  name: {
    fontFamily: " Gotham",
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
    marginTop: 20
  }
});

class ArtistCircle extends React.Component {
  state = { selected: false };

  render() {
    const { artist, onClick } = this.props;
    const { selected } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ selected: !selected });
          onClick(artist);
        }}
      >
        {selected ? (
          <View style={[Style.artistContainer, Style.selectedArtistContainer]}>
            <Image
              style={Style.img}
              source={artist.images[artist.images.length - 1].url}
              alt={artist.name}
            />
          </View>
        ) : (
          <View style={Style.artistContainer}>
            <Image
              style={Style.img}
              source={artist.images[artist.images.length - 1].url}
              alt={artist.name}
            />
          </View>
        )}
        <Text style={Style.name}>{artist.name}</Text>
      </TouchableWithoutFeedback>
    );
  }
}

export default ArtistCircle;
