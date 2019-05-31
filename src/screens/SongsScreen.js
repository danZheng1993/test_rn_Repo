import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import {
  RoundButton,
  PageHeader,
  LoadingIndicator,
  CoinHeader
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
    paddingTop: 45,
    paddingBottom: 13,
    paddingLeft: 18,
    paddingRight: 18
  }
});

export default class SongsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    loading: true,
    me: null
  };

  componentDidMount = async () => {
    const resp = await getMe();
    this.setState({ me: resp.data.user, loading: false });
  };

  loadMoreSongs = async () => {};

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    if (loading) return <LoadingIndicator />;
    const { me } = this.state;
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
          <RoundButton
            text="LOAD MORE SONGS"
            onPress={() => this.loadMoreSongs()}
          />
        </View>
      </View>
    );
  }
}
