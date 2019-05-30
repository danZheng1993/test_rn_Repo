/* eslint-disable no-nested-ternary */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";

import { YellowButton, ArtistCircle } from "../components";
import {
  getMe,
  updateMe,
  getOnboardingArtists,
  getRelatedArtists,
  artistsFollow
} from "../api";
import {
  GetLocationPermissions,
  GetCameraPermissions,
  GetCameraImage,
  GetCameraRollPermissions,
  GetCameraRollImage,
  GetContactsPermissions,
  GetContacts
} from "../utils";

// TODO: Contacts screen

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2D",
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  pageContainer: {
    height: "80%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  skipContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 8,
    padding: 8
  },
  gridContainer: {
    flex: 1,
    height: "50%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16
  },
  headerText: {
    fontFamily: "Gotham",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF"
  },
  headerSubtext: {
    fontSize: 12,
    color: "#BEBEBE"
  },
  errorText: {
    fontSize: 12,
    color: "#BD1E1E"
  },
  skipText: {
    fontSize: 14,
    color: "#BDBDBD"
  },
  logoText: {
    fontFamily: "SangBleuBold",
    fontSize: 49,
    color: "#C2B48D",
    margin: 8
  },
  missionText: {},
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});

class OnboardingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    currentPage: 1,
    isDisabled: true,
    artists: [],
    selectedArtists: [],
    artistsError: null,
    photo: null,
    photoError: null
  };

  componentDidMount = async () => {
    // TODO: Fix routing back every time

    try {
      const resp = await getOnboardingArtists(1, 10);
      console.log(resp.data);
      await this.setState({
        artists: resp.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  next = async () => {
    const { navigation } = this.props;
    const { currentPage, selectedArtists } = this.state;
    if (currentPage === 2) {
      if (selectedArtists.length > 2) {
        try {
          await this.followArtists();
          await GetLocationPermissions();
          await this.setState({
            artistsError: null,
            isDisabled: false,
            currentPage: currentPage + 1
          });
        } catch (error) {
          await this.setState({
            artistsError: "Could not follow selected artists."
          });
        }
      }
    } else if (currentPage === 3) {
      await updateMe({ onboarding_done: 1 });
      navigation.navigate("Home");
    }
  };

  checkButtonStatus = async () => {
    const { currentPage, isDisabled, selectedArtists } = this.state;
    if (currentPage === 1 && isDisabled) {
      await this.setState({ isDisabled: false });
    } else if (currentPage === 2 && isDisabled) {
      if (selectedArtists.length > 2) {
        await this.setState({ isDisabled: false });
      }
    } else if (currentPage === 3 && isDisabled) {
      await this.setState({ isDisabled: false });
    }
  };

  skipProfilePicture = () =>
    this.setState({
      photoError: null,
      isDisabled: true,
      currentPage: 2
    });

  handleArtistsChange = async (artist, index) => {
    const { artists } = this.state;
    let newArtists = [];
    let endArtists = [];

    const resp = await getRelatedArtists(artist.id);
    const relatedArtists = resp.data.artists;
    const prev = artists.slice(0, index + 1);
    const next = artists.slice(index + 1);
    endArtists = relatedArtists.concat(next);
    newArtists = newArtists.concat(prev, endArtists);
    await this.setState({ artists: newArtists });
  };

  selectArtist = async artist => {
    const { artists, selectedArtists } = this.state;
    const tempSelected = selectedArtists.slice();
    if (selectedArtists.includes(artist)) {
      const index = selectedArtists.indexOf(artist);
      tempSelected.splice(index, 1);
      await this.setState({ selectedArtists: tempSelected });
    } else {
      selectedArtists.push(artist);
      const index = artists.indexOf(artist);
      await this.handleArtistsChange(artist, index);
    }
  };

  followArtists = async () => {
    const { selectedArtists } = this.state;
    const artistIds = [];
    await selectedArtists.forEach(a => {
      artistIds.push(a.id);
    });

    await artistsFollow({ artistIds });
  };

  openCamera = async () => {
    const photo = await GetCameraImage();
    if (!photo.cancelled) {
      await this.handlePhotoChange(photo);
    }
  };

  openCameraRoll = async () => {
    const photo = await GetCameraRollImage();
    if (!photo.cancelled) {
      await this.handlePhotoChange(photo);
    }
  };

  handlePhotoChange = async photo => {
    await this.setState({ photo });
    await updateMe({
      photo: `data:image/png;base64,${photo.base64}`
    });
  };

  render() {
    const {
      currentPage,
      artists,
      photo,
      photoError,
      artistsError,
      isDisabled
    } = this.state;
    if (isDisabled && currentPage !== 1) this.checkButtonStatus();
    return (
      <View style={Style.container}>
        {currentPage === 1 && (
          <TouchableOpacity
            onPress={this.skipProfilePicture}
            style={Style.skipContainer}
          >
            <Text style={Style.skipText}>Next</Text>
          </TouchableOpacity>
        )}
        {currentPage === 1 ? (
          <FirstPage
            photo={photo}
            photoError={photoError}
            openCamera={() => this.openCamera()}
            openCameraRoll={() => this.openCameraRoll()}
          />
        ) : currentPage === 2 ? (
          <SecondPage
            artists={artists}
            artistsError={artistsError}
            selectArtist={this.selectArtist}
            isDisabled={isDisabled}
            next={() => this.next()}
          />
        ) : (
          <ThirdPage isDisabled={isDisabled} next={() => this.next()} />
        )}
      </View>
    );
  }
}

const FirstPage = ({ photo, photoError, openCamera, openCameraRoll }) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>Add a profile picture</Text>

    <Image
      style={Style.image}
      source={
        photo || require("../../assets/images/placeholder/placeholder.png")
      }
      alt="avatar"
    />
    <Text style={Style.headerSubtext}>
      Add a photo so your people know you're real & not a catfish!
    </Text>
    {photoError && (
      <Text style={[Style.headerText, Style.errorText]}>{photoError}</Text>
    )}
    <YellowButton
      width={256}
      height={50}
      fontSize={18}
      text="TAKE A PHOTO"
      onPress={openCamera}
    />
    <YellowButton
      width={256}
      height={50}
      fontSize={18}
      text="CHOOSE A PHOTO"
      onPress={openCameraRoll}
    />
  </View>
);

const SecondPage = ({
  artists,
  artistsError,
  selectArtist,
  isDisabled,
  next
}) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>Select your favorite artists</Text>
    <Text style={Style.headerSubtext}>
      These selections will help customize Zion just for you. Select at least 3
      artists.
    </Text>
    <FlatList
      data={artists}
      numColumns={2}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => (
        <ArtistCircle artist={item} onClick={selectArtist} />
      )}
    />
    {artistsError && (
      <Text style={[Style.headerText, Style.errorText]}>{artistsError}</Text>
    )}
    <YellowButton
      width={256}
      height={50}
      fontSize={18}
      text="DONE"
      disabled={isDisabled}
      onPress={next}
    />
  </View>
);

const ThirdPage = ({ isDisabled, next }) => (
  <View style={Style.pageContainer}>
    <Text style={Style.logoText}>Zion</Text>
    <Text style={Style.missionText}>
      Zion is built to spread culture with friends.
    </Text>
    <Text style={Style.missionText}>
      <b>
        You'll receive Zion coins you can use to boost the best music & content.
      </b>
    </Text>
    <Text style={Style.missionText}>
      The most highly valued artists will be invited to perform a live stream
      concert.
    </Text>
    <Text style={Style.missionText}>
      You'll want to build your net worth & coin balance as we have some fun,
      new ways to use coins coming soon.
    </Text>
    <YellowButton
      width={256}
      height={50}
      fontSize={18}
      text="LET ME IN"
      disabled={isDisabled}
      onPress={next}
    />
  </View>
);

export default OnboardingScreen;
