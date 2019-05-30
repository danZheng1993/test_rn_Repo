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
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  artistContainer: {
    width: 100,
    height: 100
  },
  selectedArtistContainer: {
    borderWidth: 10,
    borderColor: "#C2B48D"
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 40
  },
  name: {
    fontFamily: "GothamBook",
    fontSize: 14,
    color: "#ffffff",
    marginTop: 8
  }
});

class ArtistCircle extends React.Component {
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
          {selected ? (
            <View
              style={[Style.artistContainer, Style.selectedArtistContainer]}
            >
              <Image
                style={Style.img}
                source={{ uri } || null}
                alt={artist.name}
              />
            </View>
          ) : (
            <View style={Style.artistContainer}>
              <Image
                style={Style.img}
                source={{ uri } || null}
                alt={artist.name}
              />
            </View>
          )}
          <Text style={Style.name}>{artist.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ArtistCircle;
