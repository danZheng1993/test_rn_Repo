import React from "react";
import { StyleSheet, View } from "react-native";

import {
  RoundButton,
  PageHeader,
  LoadingIndicator,
  CoinHeader,
  TabBar
} from "../components";
import { getMe } from "../api";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#2D2D2D"
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 45,
    paddingBottom: 13,
    paddingLeft: 18,
    paddingRight: 18
  }
});

const TABS = [
  { value: "friends", label: "Friends" },
  { value: "top", label: "Top" },
  { value: "new", label: "New" },
  { value: "taken", label: "Taken" }
];

export default class SongsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    loading: true,
    me: null,
    activeTab: "friends",
    songs: [],
    currentPage: 1
  };

  componentDidMount = async () => {
    const resp = await getMe();
    this.setState({ me: resp.data.user, loading: false });
  };

  handleTabChange = async tab => {
    await this.setState({ activeTab: tab });
    await this.updateSongCards();
  };

  loadMoreSongs = async () => {};

  updateSongCards = async () => {};

  render() {
    const { navigation } = this.props;
    const { loading, activeTab } = this.state;
    if (loading) return <LoadingIndicator />;
    const { me } = this.state;
    console.log(activeTab);
    return (
      <View style={Style.container}>
        <CoinHeader user={me} />
        <View style={Style.contentContainer}>
          <PageHeader
            title="Music"
            subtitle="BUILD A CULTURE"
            user={me}
            navigation={navigation}
          />
          <TabBar
            value={activeTab}
            onPress={this.handleTabChange}
            tabs={TABS}
          />
          <RoundButton
            text="LOAD MORE SONGS"
            onPress={() => this.loadMoreSongs()}
          />
        </View>
      </View>
    );
  }
}
