import React from "react";
import { StyleSheet, View } from "react-native";

import {
  PageHeader,
  LoadingIndicator,
  CoinHeader,
  TabBar,
  CardGrid
} from "../components";
import { getMe, getHistory, getSongs } from "../api";

const Style = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#2D2D2D"
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
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
    currentPage: 1,
    loadMoreSongs: true
  };

  componentDidMount = async () => {
    // TODO: Pubnub integration
    const resp = await getMe();
    await this.updateSongCards();
    await this.setState({ me: resp.data.user, loading: false });
  };

  handleTabChange = async tab => {
    await this.setState({ activeTab: tab });
    await this.updateSongCards();
  };

  loadMoreSongs = async () => {
    const { activeTab, currentPage, songs } = this.state;
    const query = {
      type: activeTab,
      page: currentPage + 1,
      perPage: 16
    };

    try {
      const resp = await getSongs(query);
      const tempSongs = songs.slice();
      let loadMoreSongs = false;
      if (resp.data.metadata) {
        loadMoreSongs = !(
          resp.data.metadata.current_items + songs.length ===
          resp.data.metadata.total_items
        );
      }
      if (resp.data === "") {
        await this.setState({ loadMoreSongs: false });
      } else {
        const combinedSongs = tempSongs.concat(resp.data.songs);
        await this.setState({
          currentPage: currentPage + 1,
          songs: combinedSongs,
          loadMoreSongs
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateSongCards = async () => {
    const { activeTab, currentPage, me, songs } = this.state;
    if (activeTab === "taken") {
      const historyResp = await getHistory({
        userId: me.user_id,
        page: currentPage,
        perPage: 16
      });
      let loadMoreSongs = false;
      if (historyResp.data.metadata) {
        loadMoreSongs = !(
          historyResp.data.metadata.current_items + songs.length ===
          historyResp.data.metadata.total_items
        );
      }
      await this.setState({
        songs: historyResp.data.songs || [],
        loadMoreSongs
      });
      return;
    }
    const query = {
      type: activeTab,
      page: currentPage,
      perPage: 16
    };

    const resp = await getSongs(query);
    let loadMoreSongs = false;
    if (resp.data.metadata) {
      loadMoreSongs = !(
        resp.data.metadata.current_items + songs.length ===
        resp.data.metadata.total_items
      );
    }
    await this.setState({ songs: resp.data.songs, loadMoreSongs });
  };

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    if (loading) return <LoadingIndicator />;
    const { me, activeTab, songs, loadMoreSongs } = this.state;
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
          <CardGrid
            songs={songs}
            user={me}
            canLoadMore={loadMoreSongs}
            loadMoreSongs={this.loadMoreSongs}
          />
        </View>
      </View>
    );
  }
}
